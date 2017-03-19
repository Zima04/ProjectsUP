"use strict";

var username = null;

var userModel = (function () {
    var users = [
        {
            "username": "Alexey",
            "password": "bolvan"
        },
        {
            "username": "Valdis",
            "password": "bol"
        }
    ];

    function checkForLogIn(name, password) {
        if (name && password && typeof name == "string" && typeof password == "string") {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == name && users[i].password == password)
                    return true;
            }
            return false;
        }
        else {
            return false
        }
    }

    return {
        checkForLogIn: checkForLogIn
    }
}());

function logIn() {
    var name = document.blockAutorization.username.value;
    var password = document.blockAutorization.password.value;
    if (userModel.checkForLogIn(name, password)) {
        username = name;
        localStorage.setItem("username", username);
        window.location = "index.html";
    }
    else
        document.querySelector(".incorrect-input").innerHTML = "Неверный пароль или логин.Попробуйте ещё раз";
}

function addUserUI() {
    var username = localStorage.getItem("username");
    if (username) {
        document.getElementById("username").innerHTML = "Hi, " + username + "!";
        document.querySelector(".dropdown-button").style.visibility = "visible";
    }
}

function authorize(){
    localStorage.removeItem("username");
    window.location = "authorization.html";
}

document.addEventListener('DOMContentLoaded', addUserUI);