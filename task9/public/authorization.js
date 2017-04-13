"use strict";

let username = null;

let userModel = (function () {
    let users = [
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
            for (let i = 0; i < users.length; i++) {
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
function showLodInPage() {
    document.querySelector(".main-page").style.display = "none";
    document.querySelector(".in").style.display = "block";
}
function logIn() {
    let name = document.blockAutorization.username.value;
    let password = document.blockAutorization.password.value;
    if (userModel.checkForLogIn(name, password)) {
        username = name;
        localStorage.setItem("username", username);
        window.location = "index.html";
    }
    else
        document.querySelector(".incorrect-input").innerHTML = "Неверный пароль или логин";
}

function addUserUI() {
    let username = localStorage.getItem("username");
    if (username) {
        let arr = document.getElementsByClassName("delete-item");
        for (let i = 0; i < arr.length; i++) {
            arr[i].style.display = "block";
        }
        let arr2 = document.getElementsByClassName(" edit-item");
        for (let i = 0; i < arr.length; i++) {
            arr2[i].style.display = "block";
        }
        document.getElementById("username").innerHTML = "Hi, " + username + "!";
        document.querySelector(".dropdown-button").style.visibility = "visible";
        document.querySelector(".dropdown-categories").style.visibility = "visible";
        document.querySelector(".delete-item").style.visibility = "visible";
        document.getElementById("username").disabled = true;
        document.querySelector(".user-name").innerHTML = username;
        document.querySelector(".user-name-2").innerHTML = username;
    }
}

function authorize(){
    localStorage.removeItem("username");
    window.location = "index.html";
    let arr = document.getElementsByClassName("delete-item");
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.display = "none";
    }
    let arr2 = document.getElementsByClassName("edit-item");
    for (let i = 0; i < arr.length; i++) {
        arr2[i].style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', addUserUI);