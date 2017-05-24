function ViewModel() {
    var self = this;
    var tokenKey = 'accessToken';
    var userTitle = 'userTitle';
    //self.result = ko.observable();
    self.user = ko.observable();
    self.registerPassword = ko.observable();
    self.registerPassword2 = ko.observable();
    self.loginUser = ko.observable();
    self.loginPassword = ko.observable();
    self.logoutVisible = ko.observable();
    //self.errors = ko.observableArray([]);

    //function showError(jqXHR) {
    //    self.result(jqXHR.status + ': ' + jqXHR.statusText);
    //    var response = jqXHR.responseJSON;
    //    if (response) {
    //        if (response.Message) self.errors.push(response.Message);
    //        if (response.ModelState) {
    //            var modelState = response.ModelState;
    //            for (var prop in modelState) {
    //                if (modelState.hasOwnProperty(prop)) {
    //                    var msgArr = modelState[prop]; // expect array here
    //                    if (msgArr.length) {
    //                        for (var i = 0; i < msgArr.length; ++i) self.errors.push(msgArr[i]);
    //                    }
    //                }
    //            }
    //        }
    //        if (response.error) self.errors.push(response.error);
    //        if (response.error_description) self.errors.push(response.error_description);
    //    }
    //}

    //self.callApi = function () {
    //    self.result('');
    //    self.errors.removeAll();
    //    var token = sessionStorage.getItem(tokenKey);
    //    var headers = {};
    //    if (token) {
    //        headers.Authorization = 'Bearer ' + token;
    //    }
    //    $.ajax({
    //        type: 'GET',
    //        url: '/api/values',
    //        headers: headers
    //    }).done(function (data) {
    //        self.result(data);
    //    }).fail(showError);
    //}
    self.register = function () {
        //self.result('');
        //self.errors.removeAll();

        var data = {
            userName: self.user(),
            password: self.registerPassword(),
            confirmPassword: self.registerPassword2()
        };

        $.ajax({
            type: 'POST',
            url: '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
            //statusCode: {
            //    302: function () {
            //        alert('1');
            //    }
            //},
            //success: function () {
            //    alert("success");
            //},
            //error: function (jqXHR, exception) {
            //    if (jqXHR.status === 0) {
            //        alert('Not connect.\n Verify Network.');
            //    } else if (jqXHR.status == 404) {
            //        alert('Requested page not found. [404]');
            //    } else if (jqXHR.status == 500) {
            //        alert('Internal Server Error [500].');
            //    } else if (exception === 'parsererror') {
            //        alert('Requested JSON parse failed.');
            //    } else if (exception === 'timeout') {
            //        alert('Time out error.');
            //    } else if (exception === 'abort') {
            //        alert('Ajax request aborted.');
            //    } else {
            //        alert('Uncaught Error.\n' + jqXHR.responseText);
            //    }
            //}
        }).done(function (data) {
            self.logoutVisible(false);
            window.location.href = "http://localhost:29370/Home/Index"
        });
    }

    self.login = function () {
        //self.result('');
        //self.errors.removeAll();
        var us = self.loginUser();
        var loginData = {
            grant_type: 'password',
            username: self.loginUser(),
            password: self.loginPassword()
        };
        $.ajax({
            type: 'POST',
            url: '/token',
            data: loginData
        }).done(function (data) {
            self.user(data.userName);
            // Cache the access token in session storage.
            sessionStorage.setItem(tokenKey, data.access_token);
            sessionStorage.setItem(userTitle, us);
            self.logoutVisible(true);
            window.location.href = "http://localhost:29370/Home/Customer";
        });
    }

    //self.logout = function () {
    //    // Log out from the cookie based logon.
    //    var token = sessionStorage.getItem(tokenKey);
    //    var headers = {};
    //    if (token) {
    //        headers.Authorization = 'Bearer ' + token;
    //    }
    //    $.ajax({
    //        type: 'POST',
    //        url: '/api/Account/Logout',
    //        headers: headers
    //    }).done(function (data) {
    //        // Successfully logged out. Delete the token.
    //        self.user('');
    //        sessionStorage.removeItem(tokenKey);
    //        sessionStorage.removeItem(userTitle);
    //        self.logoutVisible(false);
    //        window.location.href = "http://localhost:29370/Home/Index";

    //    });
    //}
}

ko.applyBindings(new ViewModel());