'use strict';

function lookItem(el) {
    const article = articleModel.getArticle(el.dataset.id);
    document.getElementById('idItem').setAttribute('idItem', article._id);
    document.querySelector('.main-page').style.display = 'none';
    document.querySelector('.full-news').style.display = 'block';
    document.querySelector('.article-item-title').textContent = article.title;
    document.querySelector('.article-title-img').setAttribute('src', article.img);
    document.querySelector('.article-item-content').textContent = article.content;
    document.querySelector('.article-item-author').textContent = article.author;
    document.querySelector('.article-item-date').textContent = article.createdAt.toLocaleDateString('ru', options);
    if (article.tags[0]) {
        document.querySelector('#article-tags-first').textContent = `#${article.tags[0]}`;
    }
    if (article.tags[1]) {
        document.querySelector('#article-tags-second').textContent = `#${article.tags[1]}`;
    }
    if (article.tags[2]) {
        document.querySelector('#article-tags-third').textContent = `#${article.tags[2]}`;
    }
    if (article.tags[3]) {
        document.querySelector('#article-tags-fourth').textContent = `#${article.tags[3]}`;
    }
    if (article.tags[4]) {
        document.querySelector('#article-tags-fifth').textContent = `#${article.tags[4]}`;
    }
    window.scrollTo(0, 0);
}

let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};
