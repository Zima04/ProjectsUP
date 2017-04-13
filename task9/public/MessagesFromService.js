"use strict";

let dbModel = (function () {

    function deleteArtical(id) {
        let req = new XMLHttpRequest();
        req.open('DELETE', '/articles' + id);
        req.send();
    }

    function addArtical(article) {
        let req = new XMLHttpRequest();
        req.open('POST', '/articles');
        req.setRequestHeader('content-type', 'application/json');
        req.send(JSON.stringify(article));
    }

    function editArtical(article) {
        let req = new XMLHttpRequest();
        req.open('PATCH', '/articles');
        req.setRequestHeader('content-type', 'application/json');
        req.send(JSON.stringify(article));
    }

    function getArrayOfArticals() {
        let req = new XMLHttpRequest();
        req.open('GET', '/articles', false);
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {
                return req.responseText;
            }
        };
        return req.onreadystatechange();
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
        getSize:getSize
    }
}());