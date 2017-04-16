"use strict";

let dbModel = (function () {

    function deleteArtical(id) {

        return new Promise(function (resolve, reject) {

            let req = new XMLHttpRequest();
            req.open('DELETE', '/articles' + id);
            req.onload = function () {
                if (req.status == 200) {
                    resolve(this.response);
                }
            };
            req.onerror = () => reject(new Error("deleteArtical crashed."));
            req.send();
        });
    }

    /* deleteArtical("12312341").then(
     resolve => {
     console.log(resolve)
     },
     reject => console.log(reject)
     );*/

    function addArtical(article) {

        return new Promise(function (resolve, reject) {

            let req = new XMLHttpRequest();
            req.open('POST', '/articles');
            req.setRequestHeader('content-type', 'application/json');
            req.onload = function () {
                if (req.status == 200) {
                    resolve(this.response);
                }
            };
            req.onerror = () => reject(new Error("addArtical crashed."));
            req.send(JSON.stringify(article));
        });
    }

    function editArtical(article) {

        return new Promise(function (resolve, reject) {

            let req = new XMLHttpRequest();
            req.open('PATCH', '/articles');
            req.setRequestHeader('content-type', 'application/json');
            req.onload = function () {
                if (req.status == 200) {
                    resolve(this.response);
                }
            };
            req.onerror = () => reject(new Error("editArtical crashed."));
            req.send(JSON.stringify(article));
        });
    }

    function getArrayOfArticals() {

        return new Promise(function (resolve, reject) {

            let req = new XMLHttpRequest();
            req.open('GET', '/articles');
            req.onload = function () {
                if (req.status == 200) {
                    resolve(JSON.parse(req.responseText,(key,value) =>{
                        if(key === "createdAt")
                            return new Date(value);
                        return value;
                    }));
                }
            };
            req.onerror = () => reject(new Error("getArrayOfAeticals crashed."));
            req.send();
        });
    }

    function getSize(mas) {
        let temp = [];
        temp = mas;
        return temp.length;
    }

    return {
        getArrayOfArticals: getArrayOfArticals,
        addArtical: addArtical,
        deleteArtical: deleteArtical,
        editArtical: editArtical,
        getSize: getSize
    }
}());