// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

$(document).ready(function () {
    // local storage detector
    var isSupportLocalStorage = false;
    if (typeof(Storage) !== "undefined") {
        isSupportLocalStorage = true;
        // more info about localStorage = http://www.w3schools.com/html/html5_webstorage.asp
    } else {
        alert("Your browser doesn't support local storage. Please upgrade or install another good one.");
    }

    // ------ daftar user getter ----------
    var users = null;

    function getUser(callback) {
        $.getJSON("src/data/users.json", function (data) {
            dataUser = JSON.stringify(data);
            callback(dataUser);
        });
    }

    getUser(function (datauser) {
        users = JSON.parse(datauser);
        // give name for each user
        for (var i = 0; i < users.users.length; i++) {
            users.users[users.users[i].username] = users.users[i];
        }
    });
    // ------ daftar user getter ----------


    // Login
    // Login - Session
    if (sessionStorage.getItem("username") != undefined) {
        window.location.replace("app.html");
    }
    // Login - Session
    $("button[name='login']").click(function () {
        var inUser = $("input[name='username']");
        var inPass = $("input[name='password']");
        var username = inUser.val();
        var password = inPass.val();
        var isUsernameValid = username.search(/[a-zA-Z0-9]+$/) >= 0;
        var isPasswordValid = password.search(/[a-zA-Z0-9]+$/) >= 0;

        if (!isUsernameValid || !isPasswordValid) {
            alert("username dan password tak valid");
            return;
        }

        if (users.users[username] != undefined && password == users.users[username].password) {
            sessionStorage.setItem("username", username);
            window.location.replace("app.html");
        } else {
            alert("username atau password anda salah");
        }
    });
    // Login [END]

});