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
        [Route("WriteResponse")]
        public IHttpActionResult PostWriteResponse([FromBody] Guid task_id)
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
        public IHttpActionResult PostSubmitResponse(Comment comPass)//[FromBody] Guid task_id)
        {
            //ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
            //string userN = ClaimsPrincipal.Current.Identity.GetUserName();
            var manager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(new dbContext()));
            var currentUser = User.Identity.GetUserId();
            try
            {
                //var task = db.Task.FirstOrDefault(x => x.Id == task_id);
                Comment com = new Comment()
                {
                    Id = Guid.NewGuid(),
                    DateComment = DateTime.Now,
                    Text = comPass.Text,
                    AuthorID = currentUser,
                    TaskID = comPass.TaskID
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
        [Authorize]
        [Route("WriteRequest")]
        public IHttpActionResult PostWriteRequest()
        {
            //var data = db.Comment.Join(db.Users,
            //         p => p.Author.Id,
            //         c => c.Id,
            //         (p, c) => new
            //         {
            //             p.Text,
            //             c.UserName,
            //             p.Task.Id
            //         })
            //         .Where(x => x.Id == task_id)
            //         .Select(x => new { x.UserName, x.Text });
            return Ok();
        }
        [Authorize]
        [Route("SubmitRequest")]
        public IHttpActionResult PostAddNewRequest(Task taskPass)
        {
            var manager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(new dbContext()));
            var currentUser = User.Identity.GetUserId();
            try
            {
                Task newTask = new Task()
                {
                    Id = Guid.NewGuid(),
                    DateTask = DateTime.Now,
                    Title = taskPass.Title,
                    Status = "Created",
                    OperatorID = currentUser,
                    CustomerID = currentUser
                };
                db.Task.Add(newTask);
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
