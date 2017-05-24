using CSPortal.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Routing;

namespace CSPortal.Controllers.ApiControllers
{
    [RoutePrefix("api/Requests")]
    public class RequestsController : ApiController
    {
        private dbContext db = new dbContext();

        [Authorize]
        [Route("All")]
        public IHttpActionResult GetAll()
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            var id = ClaimsPrincipal.Current.Identity.GetUserId();
            var data = db.Task
            .Where(x => x.Operator.Id == id)
            .Select(x => new { x.Id, x.DateTask, x.Title, x.Status });

            return Ok(data);
        }
        [Authorize]
        [Route("WriteRespond")]
        public IHttpActionResult PostWriteRespond([FromBody] Guid task_id)
        {
            var data = db.Comment.Join(db.Users,
                     p => p.Author.Id,
                     c => c.Id,
                     (p, c) => new
                     {
                         p.Text,
                         c.UserName,
                         p.Task.Id
                     })
                     .Where(x => x.Id == task_id)
                     .Select(x => new { x.UserName, x.Text });
            return Ok(data);
        }
        [Authorize]
        [Route("SubmitResponse")]
        public IHttpActionResult PostSubmitResponse([FromBody] Guid task_id)
        {
            ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            string userN = ClaimsPrincipal.Current.Identity.GetUserName();
            //UserManager<Author> UserManager = new UserManager<Author>(new UserStore<Author>(db));
            //var p = db.Users.FirstOrDefault(us => us.UserName == userN);
            var manager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(new dbContext()));
            var currentUser = manager.FindById(User.Identity.GetUserId());
            try
            {
                var task = db.Task.FirstOrDefault(x => x.Id == task_id);
                Comment com = new Comment()
                {
                    Id = Guid.NewGuid(),
                    DateComment = DateTime.Now,
                    Text = "hELLO",
                    Author = (Author)currentUser,
                    Task = task
                };
                db.Comment.Add(com);
                db.SaveChanges();
                return Ok();
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
            {
                Exception raise = dbEx;
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        string message = string.Format("{0}:{1}",
                            validationErrors.Entry.Entity.ToString(),
                            validationError.ErrorMessage);
                        // raise a new exception nesting
                        // the current instance as InnerException
                        raise = new InvalidOperationException(message, raise);
                    }
                }
                throw raise;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
