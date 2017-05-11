'use strict';

let filter = null;
let error = 'Введите данные';

function getFilter() {
    let flag = false;
    const name = document.getElementById('author').value;
    let tags = document.getElementById('tag').value;
    const createdAt = document.getElementById('data').value;
    filter = {};
    if (name) {
        filter.author = name;
        flag = true;
    }
    if (tags) {
        tags = tags.split(/[\s.,]+/);
        filter.tags = tags;
        flag = true;
    }
    if (createdAt) {
        const date = isValidDate(createdAt);
        if (date) {
            filter.createdAt = date;
            flag = true;
        } else {
            error = 'неверный формат даты';
            flag = false;
        }
    }
    return flag;
}

function isValidDate(val) {
    const valR = val.split(/-/);
    valR[1] -= 1;
    const curDate = new Date(valR[2], valR[1], valR[0]);
    if (!(curDate.getFullYear() === valR[2])) {
        return false;
    }
    if (!(curDate.getMonth() === valR[1])) {
        return false;
    }
    if (!(curDate.getDate() === valR[0])) {
        return false;
    }

    return curDate;
}

function startFilter() {
    if (getFilter()) {
        const NewArticles = articleModel.getArticles(0, articleModel.getLength(), filter);
        if (NewArticles !== 0) {
            articleRenderer.removeArticlesFromDom();
            articleRenderer.insertArticlesInDOM(NewArticles);
            document.querySelector('.pagination-button').style.visibility = 'hidden';
        } else {
            alert('Новости не найдены!');
        }
    } else {
        alert('Заполните поля для фильтра!');
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        addUserUI();
    }
}