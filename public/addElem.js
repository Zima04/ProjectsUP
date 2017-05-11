'use strict';

function showAddPage() {
    document.querySelector('.main-page').style.display = 'none';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'inline-block';
}

function randomId(min, max) {
    return Math.floor(Math.random() * (max - (min + 1))) + min;
}

function addItem() {
    dbModel.getUserName().then((name) => {
        let newId = 0;
        while (articleModel.isArticle(newId) !== -1) {
            newId = randomId(0, 100);
        }
        const head = document.blockAddItem.head.value;
        const message = document.blockAddItem.message.value;
        const tags = document.blockAddItem.tags.value;
        const image = document.blockAddItem.image.value;
        const newTags = tags.split(' ');
        dbModel.addArtical({
            id: newId,
            title: head,
            summary: message,
            createdAt: new Date(),
            author: name,
            content: message,
            img: image,
            tags: newTags,
        }).then(
            () => {
                alert('Новость добавлена в ленту!');
                document.querySelector('.main-page').style.display = 'inline-block';
                document.querySelector('.edit-news').style.display = 'none';
                document.querySelector('.full-news').style.display = 'none';
                document.querySelector('.block-add-news').style.display = 'none';
                document.querySelector('.in').style.display = 'none';
                startApp();
                addUserUI();
            });
    });
}
