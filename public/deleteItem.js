'use strict';

function deleteItem(el) {
    dbModel.deleteArtical(el.dataset.id).then(
        () => {
            document.querySelector('.main-page').style.display = 'inline-block';
            document.querySelector('.edit-news').style.display = 'none';
            alert('Новость удалена!');
            startApp();
        });
}

function deleteItemFromFull(el) {
    dbModel.deleteArtical(el._id).then(
        () => {
            document.querySelector('.full-news').style.display = 'none';
            document.querySelector('.main-page').style.display = 'inline-block';
            alert('Новость удалена!');
            startApp();
            addUserUI();
        });
}
