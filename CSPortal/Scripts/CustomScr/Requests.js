var tokenKey = 'accessToken';
var userTitle = 'userTitle';

getTasks = function () {

    var token = sessionStorage.getItem(tokenKey);
    var us = sessionStorage.getItem(userTitle);
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    $.ajax({
        type: 'GET',
        url: '/api/Requests/All',
        headers: headers
    }).done(function (data) {
        document.getElementById('welcome').innerText += ' ' + us;
        var sect = document.getElementById('table');
        var tbl = document.createElement('table');
        tbl.setAttribute('border', '1');
        var tbdy = document.createElement('tbody');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('№'));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode('Request text'));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode('Status'));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode('Option'));
        tr.appendChild(td);
        tbdy.appendChild(tr);
        for (var i = 0; i < data.length; i++) {
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.appendChild(document.createTextNode(i));
            tr.appendChild(td);
            td = document.createElement('td');
            td.appendChild(document.createTextNode(data[i].title));
            tr.appendChild(td);
            td = document.createElement('td');
            td.appendChild(document.createTextNode(data[i].status));
            tr.appendChild(td);
            td = document.createElement('td');
            if (data[i].status == 'Closed') {
                td.appendChild(document.createTextNode('\u0020'));
                tr.appendChild(td);
            }
            else {
                var btn = document.createElement('button');
                btn.setAttribute('onClick', "addResponse(this.id);");
                btn.setAttribute('id', data[i].id);
                btn.appendChild(document.createTextNode('Respond'));
                td.appendChild(btn);
                tr.appendChild(td);
            }
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        sect.appendChild(tbl);

        var addRequestBtn = document.createElement('button');
        addRequestBtn.setAttribute('onClick', "addRequest();");
        addRequestBtn.appendChild(document.createTextNode('Add new'));
        sect.appendChild(addRequestBtn);

    });
}

getTasks();

addResponse = function (task_id) {

    var token = sessionStorage.getItem(tokenKey);
    var us = sessionStorage.getItem(userTitle);
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    $.ajax({
        type: 'POST',
        url: '/api/Requests/WriteResponse',
        headers: headers,
        data: "=", task_id
    }).done(function (data) {
        document.getElementById('table').innerText = '';
        var sect = document.getElementById('table');
        var tbl = document.createElement('table');
        tbl.setAttribute('border', '1');
        var tbdy = document.createElement('tbody');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('History of conversation:'));
        td.setAttribute('colSpan', '2');
        tr.appendChild(td);
        tbdy.appendChild(tr);
        for (var i = 0; i < data.length; i++) {
            tr = document.createElement('tr');
            td = document.createElement('td');
            td.appendChild(document.createTextNode(data[i].userName));
            tr.appendChild(td);
            td = document.createElement('td');
            td.appendChild(document.createTextNode(data[i].text));
            tr.appendChild(td);
            td = document.createElement('td');
            tbdy.appendChild(tr);
        }
        tbl.appendChild(tbdy);
        sect.appendChild(tbl);
        var br = document.createElement('br');
        sect.appendChild(br);
        var workArea = document.getElementById('workArea');


        //var f = document.createElement("form");
        //f.setAttribute('method', "post");
        //f.setAttribute('action', "/api/Requests/SubmitResponse");


        tbl = document.createElement('table');
        tbl.setAttribute('border', '1');
        tbdy = document.createElement('tbody');
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createTextNode('Response:  '));
        tr.appendChild(td);
        td = document.createElement('td');
        var inpt = document.createElement('input');
        inpt.setAttribute('id', 'responseInput');
        //inpt.setAttribute('required', '');
        td.appendChild(inpt);
        tr.appendChild(td);
        tbdy.appendChild(tr);
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createTextNode(''));
        tr.appendChild(td);
        td = document.createElement('td');
        var s = document.createElement('input');
        s.setAttribute('type', "button");
        s.setAttribute('value', "Submit");
        s.setAttribute('id', task_id);
        s.setAttribute('onClick', "return(submitResponse(this.id));");
        td.appendChild(s);
        tr.appendChild(td);
        tbdy.appendChild(tr);
        tbl.appendChild(tbdy);
        workArea.appendChild(tbl);

        //f.appendChild(tbl);
        //workArea.appendChild(f);
    });
}

submitResponse = function (task_id) {
    if (document.getElementById('responseInput').value == "") {
        alert("Please enter your response!");
        document.getElementById('responseInput').focus();
        return false;
    }
    var token = sessionStorage.getItem(tokenKey);
    var us = sessionStorage.getItem(userTitle);
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    var val = {
        'Text': document.getElementById('responseInput').value,
        'TaskID': task_id
        //author: {
        //    id: '0cd0f199-f711-400f-b71d-8507cd788260'
        //},
        //task: {
        //    id: task_id
        //}
    }
    $.ajax({
        type: 'POST',
        url: '/api/Requests/SubmitResponse',
        headers: headers,
        //data: "=" + task_id
        data: val//JSON.stringify(val)
    }).done(function () {
        alert('Your respond is saved');
        window.location.href = "http://localhost:29370/Home/Customer";

    });
}

addRequest = function () {

    var token = sessionStorage.getItem(tokenKey);
    var us = sessionStorage.getItem(userTitle);
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    $.ajax({
        type: 'POST',
        url: '/api/Requests/WriteRequest',
        headers: headers
    }).done(function () {
        document.getElementById('table').innerText = '';
        var sect = document.getElementById('table');
        var tbl = document.createElement('table');
        tbl.setAttribute('border', '1');
        tbdy = document.createElement('tbody');
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createTextNode('New request:  '));
        tr.appendChild(td);
        td = document.createElement('td');
        var inpt = document.createElement('input');
        inpt.setAttribute('id', 'newRequest');
        td.appendChild(inpt);
        tr.appendChild(td);
        tbdy.appendChild(tr);
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createTextNode(''));
        tr.appendChild(td);
        td = document.createElement('td');
        var s = document.createElement('input');
        s.setAttribute('type', "button");
        s.setAttribute('value', "Submit");
        s.setAttribute('onClick', "return(submitNewRequest());");
        td.appendChild(s);
        tr.appendChild(td);
        tbdy.appendChild(tr);
        tbl.appendChild(tbdy);
        sect.appendChild(tbl);
    });
}

submitNewRequest = function () {
    var token = sessionStorage.getItem(tokenKey);
    var us = sessionStorage.getItem(userTitle);
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    var val = {
        'Title': document.getElementById('newRequest').value,
    }
    $.ajax({
        type: 'POST',
        url: '/api/Requests/SubmitRequest',
        headers: headers,
        data: val
    }).done(function () {
        alert('OK');
        window.location.href = "http://localhost:29370/Home/Customer";
    });
}

logout = function () {
    // Log out from the cookie based logon.
    var token = sessionStorage.getItem(tokenKey);
    var headers = {};
    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }
    $.ajax({
        type: 'POST',
        url: '/api/Account/Logout',
        headers: headers
    }).done(function (data) {
        sessionStorage.removeItem(userTitle);
        sessionStorage.removeItem(tokenKey);
        window.location.href = "http://localhost:29370/Home/Index";
    });
}