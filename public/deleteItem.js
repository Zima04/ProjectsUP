'use strict';

function deleteItem(el) {
    const article = articleModel.getArticle(el.dataset.id);
    dbModel.deleteArtical(article.id).then(
        () => {
            document.querySelector('.main-page').style.display = 'inline-block';
            document.querySelector('.edit-news').style.display = 'none';
            alert('Новость удалена!');
            startApp();
            addUserUI();
        });
}

function deleteItemFromFull(el) {
    const article = articleModel.getArticle(el.id);
    dbModel.deleteArtical(article.id).then(
        () => {
            document.querySelector('.full-news').style.display = 'none';
            document.querySelector('.main-page').style.display = 'inline-block';
            alert('Новость удалена!');
            startApp();
            addUserUI();
        });
}
