'use strict';

function getItem(elem) {
    document.querySelector('.main-page').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.edit-news').style.display = 'inline-block';
    dbModel.getArticleById(elem.dataset.id).then((article) => {
        document.blockChangeItem.setAttribute('get-id', article._id);
        document.getElementById('get-name').value = article.title;
        document.getElementById('get-message').value = article.summary;
        document.getElementById('get-img').value = article.img;
        let newTags = ' ';
        for (let i = 0; i < article.tags.length - 1; i += 1) {
            newTags += `${article.tags[i]} `;
        }
        newTags += article.tags[article.tags.length - 1];
        document.getElementById('get-tags').value = newTags;
    });
}

function getItemFromFull(elem) {
    document.querySelector('.main-page').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.edit-news').style.display = 'inline-block';
    dbModel.getArticleById(elem.dataset.id).then((article) => {
        document.blockChangeItem.setAttribute('get-id', article._id);
        document.getElementById('get-name').value = article.title;
        document.getElementById('get-message').value = article.summary;
        document.getElementById('get-img').value = article.img;
        let newTags = '';
        for (let i = 0; i < article.tags.length - 1; i += 1) {
            newTags += `${article.tags[i]} `;
        }
        newTags += article.tags[article.tags.length - 1];
        document.getElementById('get-tags').value = newTags;
    });
}

function changeFields(inputId) {
    dbModel.getUserName().then(
        (name) => {
            const head = document.blockChangeItem.head.value;
            const message = document.blockChangeItem.message.value;
            const tags = document.blockChangeItem.tags.value;
            const image = document.blockChangeItem.image.value;
            const newTags = tags.split(' ');
            dbModel.editArtical({
                author: name,
                id: inputId,
                title: head,
                summary: message,
                createdAt: new Date(),
                content: message,
                img: image,
                tags: newTags
            }).then(
                () => {
                    alert('Новость редактирована!');
                    document.querySelector('.main-page').style.display = 'inline-block';
                    document.querySelector('.edit-news').style.display = 'none';
                    document.querySelector('.full-news').style.display = 'none';
                    document.querySelector('.block-add-news').style.display = 'none';
                    document.querySelector('.in').style.display = 'none';
                    startApp();
                });
        });
}
