'use strict';

const dbModel = (function () {
    function deleteArtical(id) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('DELETE', `/articles${id}`);
            req.onload = function () {
                if (req.status === 200) {
                    resolve(this.response);
                }
            };
            req.onerror = () => reject(new Error('deleteArtical crashed.'));
            req.send();
        });
    }

    function addArtical(article) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('POST', '/articles');
            req.setRequestHeader('content-type', 'application/json');
            req.onload = function () {
                if (req.status === 200) {
                    resolve(this.response);
                }
            };
            req.onerror = () => reject(new Error('addArtical crashed.'));
            req.send(JSON.stringify(article));
        });
    }

    function editArtical(article) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('PATCH', '/articles');
            req.setRequestHeader('content-type', 'application/json');
            req.onload = function () {
                if (req.status === 200) {
                    resolve(this.response);
                }
            };
            req.onerror = () => reject(new Error('editArtical crashed.'));
            req.send(JSON.stringify(article));
        });
    }

    function getArrayOfArticals() {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', '/articles');
            req.onload = function () {
                if (req.status === 200) {
                    resolve(JSON.parse(req.responseText, (key, value) => {
                        if (key === 'createdAt') {
                            return new Date(value);
                        }
                        return value;
                    }));
                }
            };
            req.onerror = () => reject(new Error('getArrayOfAeticals crashed.'));
            req.send();
        });
    }

    function logIn(user) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('POST', '/login');
            req.setRequestHeader('content-type', 'application/json');
            req.onload = function () {
                if (req.status === 200) {
                    resolve();
                } else {
                    reject();
                }
            };
            req.onerror = () => reject(new Error('logIn crashed.'));
            req.send(JSON.stringify(user));
        });
    }

    function logExit() {
        return new Promise((resolve) => {
            const req = new XMLHttpRequest();
            req.open('GET', '/logout');
            req.onload = function () {
                if (req.status === 200) {
                    resolve();
                }
            };
            req.send();
        });
    }

    function getUserName() {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', '/username');
            req.onload = function () {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    reject();
                }
            };
            req.onerror = () => reject(new Error('getUserName crashed.'));
            req.send();
        });
    }

    function getSize(mas) {
        let temp = [];
        temp = mas;
        return temp.length;
    }

    return {
        getArrayOfArticals,
        addArtical,
        deleteArtical,
        editArtical,
        getSize,
        logIn,
        logExit,
        getUserName,
    };
}());
