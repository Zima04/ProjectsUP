'use strict';

function showLodInPage() {
    document.querySelector('.main-page').style.display = 'none';
    document.querySelector('.in').style.display = 'block';
}
function logIn() {
    const username = document.blockAutorization.username.value;
    const password = document.blockAutorization.password.value;
    dbModel.logIn({username, password}).then(
        (ready) => {
            addUserUI();
            window.location = 'index.html';
        },
        (notready) => {
            document.querySelector('.incorrect-input').innerHTML = 'Неверный пароль или логин';
        });
}

function addUserUI() {
    dbModel.getUserName().then(
        (response) => {
            const arr = document.getElementsByClassName('delete-item');
            for (let i = 0; i < arr.length; i += 1) {
                arr[i].style.display = 'block';
            }
            const arr2 = document.getElementsByClassName(' edit-item');
            for (let i = 0; i < arr.length; i += 1) {
                arr2[i].style.display = 'block';
            }
            document.getElementById('username').innerHTML = `Hi,${response}!`;
            document.querySelector('.dropdown-button').style.visibility = 'visible';
            document.querySelector('.dropdown-categories').style.visibility = 'visible';
            document.querySelector('.delete-item').style.visibility = 'visible';
            document.getElementById('username').disabled = true;
            document.querySelector('.user-name').innerHTML = response;
            document.querySelector('.user-name-2').innerHTML = response;
        },
        error => console.log('addUserUI crashed'));
}

function authorize() {
    dbModel.logExit().then(
        () => {
            document.getElementById('username').textContent = '';
            document.querySelector('.user-name').textContent = '';
            document.querySelector('.user-name-2').textContent = '';
            window.location = 'index.html';
            const arr = document.getElementsByClassName('delete-item');
            for (let i = 0; i < arr.length; i += 1) {
                arr[i].style.display = 'none';
            }
            const arr2 = document.getElementsByClassName('edit-item');
            for (let i = 0; i < arr.length; i += 1) {
                arr2[i].style.display = 'none';
            }
        });
}

document.addEventListener('DOMContentLoaded', addUserUI);
