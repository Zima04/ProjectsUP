'use strict';

function search() {
    const string = document.getElementById('searchString').value;
    const articles = articleModel.getArticles(0, articleModel.getLength());
    const newArticles = [];
    let countOfArticles = 0;
    for (let i = 0; i < articleModel.getLength(); i += 1) {
        if (articles[i].title.indexOf(string) > -1) {
            newArticles[countOfArticles] = articles[i];
            countOfArticles += 1;
            continue;
        }
        if (articles[i].summary.indexOf(string) > -1) {
            newArticles[countOfArticles] = articles[i];
            countOfArticles += 1;
            continue;
        }
        if (articles[i].author.indexOf(string) > -1) {
            newArticles[countOfArticles] = articles[i];
            countOfArticles += 1;
            continue;
        }
        if (articles[i].content.indexOf(string) > -1) {
            newArticles[countOfArticles] = articles[i];
            countOfArticles += 1;
        }
        for (let j = 0; j < articles[i].tags.length; j += 1) {
            if (articles[i].tags[j].indexOf(string) > -1) {
                newArticles[countOfArticles] = articles[i];
                countOfArticles += 1;
                break;
            }
        }
    }
    if (countOfArticles === 0) {
        alert('Новости не найдены!');
        return 0;
    }
    articleRenderer.removeArticlesFromDom();
    articleRenderer.insertArticlesInDOM(newArticles);
    document.querySelector('.pagination-button').style.visibility = 'hidden';
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
}

function cl(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById('btn').click();
        search();
    }
    return false;
}
