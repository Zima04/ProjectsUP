'use strict';

const articleModel = (function () {
    const arrayOfTags = ['cars', 'politics', 'hi-tech', 'sport', 'fashion', 'BOOM', 'Russia', 'IT'];
    let articles = [{}];

    const getArticles = (skip, top, filterConfig) => {
        if (!skip) {
            skip = 0;
        }
        if (skip >= articles.length) {
            return null;
        }
        if (!top) {
            top = 10;
        }

        articles.sort((a, b) => b.createdAt - a.createdAt);

        const newArticles = [];

        if (!filterConfig) {
            for (let i = skip; i < articles.length && i < top + skip; i += 1) {
                newArticles.push(articles[i]);
            }
        } else {
            if (filterConfig.author && filterConfig.tags && filterConfig.createdAt) {
                for (let i = skip; i < articles.length && i < top + skip; i += 1) {
                    if (filterConfig.author === articles[i].author && findTag(filterConfig.tags, articles[i].tags)
                        && filterConfig.createdAt.getTime() === articles[i].createdAt.getTime()) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author && filterConfig.tags && !filterConfig.createdAt) {
                for (let i = skip; i < articles.length && i < top + skip; i += 1) {
                    if (filterConfig.author === articles[i].author && findTag(filterConfig.tags, articles[i].tags)) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author && !filterConfig.tags && filterConfig.createdAt) {
                for (let i = skip; i < articles.length && i < top + skip; i += 1) {
                    if (filterConfig.author === articles[i].author && filterConfig.createdAt.getTime() === articles[i].createdAt.getTime()) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author && !filterConfig.tags && !filterConfig.createdAt) {
                for (let i = skip; i < articles.length && i < top + skip; i += 1) {
                    if (filterConfig.author === articles[i].author) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (!filterConfig.author && filterConfig.tags && filterConfig.createdAt) {
                for (let i = skip; i < articles.length && i < top + skip; i += 1) {
                    if (findTag(filterConfig.tags, articles[i].tags) && filterConfig.createdAt.getTime() === articles[i].createdAt.getTime()) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (!filterConfig.author && filterConfig.tags && !filterConfig.createdAt) {
                for (let i = skip; i < articles.length && i < top + skip; i += 1) {
                    if (findTag(filterConfig.tags, articles[i].tags)) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (!filterConfig.author && !filterConfig.tags && filterConfig.createdAt) {
                for (let i = skip; i < articles.length && i < top + skip; i += 1) {
                    if (filterConfig.createdAt.getFullYear() === articles[i].createdAt.getFullYear() && filterConfig.createdAt.getDate() === articles[i].createdAt.getDate() && filterConfig.createdAt.getMonth() === articles[i].createdAt.getMonth()) {
                        newArticles.push(articles[i]);
                    }
                }
            }
        }
        return newArticles;
    };
    const findTag = (tag, articleTags) => {
        for (let i = 0; i < articleTags.length; i += 1) {
            if (tag.some(elem => elem === articleTags[i])) {
                return true;
            }
        }
        return false;
    };
    const getArticle = (id) => {
        const index = isArticle(id);
        if (index === -1) {
            return null;
        } else {
            return articles[index];
        }
    };
    const validateArticle = article => ((typeof (article.id) === 'number')
    && (typeof (article.title) === 'string' && article.title.length < 100 && article.title != null)
    && (typeof (article.summary) === 'string' && article.summary.length < 200)
    && (typeof (article.createdAt) === 'object')
    && (typeof (article.author) === 'string' && article.author != null)
    && (typeof (article.content) === 'string' && article.content != null)
    && (article.tags && article.tags.length > 0));
    const addArticle = (article) => {
        if (validateArticle(article)) {
            articles.push(article);
            return true;
        }
        return false;
    };
    const editArticle = (id, article) => {
        const index = isArticle(id);
        if (index === -1) {
            return false;
        }
        if (article.id && article.author && article.createdAt) {
            return false;
        }
        if (article.title && typeof article.title === 'string' && article.title.length > 0 &&
            article.title.length <= 100) {
            articles[index].title = article.title;
        }
        if (article.summary && typeof article.summary === 'string' && article.summary.length > 0 &&
            article.summary.length <= 200) {
            articles[index].summary = article.summary;
        }
        if (article.content && typeof article.content === 'string' && article.content.length > 0) {
            articles[index].content = article.content;
        }
        if (article.img && typeof article.img === 'string' && article.img.length > 0) {
            articles[index].img = article.img;
        }
        if (article.tags && article.tags.length >= 1 && article.tags.length <= 5) {
            articles[index].tags = article.tags;
        }
        return true;
    };
    const isArticle = (id) => {
        const res = -1;
        for (let i = 0; i < articles.length; i += 1) {
            if (articles[i].id === id) {
                return i;
            }
        }
        return res;
    };
    const removeArticle = (id) => {
        const index = isArticle(id);
        if (index === -1) {
            return false;
        } else {
            articles.splice(index, 1);
            return true;
        }
    };
    const isContainTag = (tag) => {
        if (tag && typeof tag === 'string') {
            for (let i = 0; i < arrayOfTags.length; i += 1) {
                if (tag === arrayOfTags[i]) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    };
    const addToTagsArray = (tag) => {
        let index = arrayOfTags.length;
        for (let i = 0; i < tag.length; i += 1) {
            if (!isContainTag(tag[i])) {
                arrayOfTags[index += 1] = tag[i];
            }
        }
    };
    const addTagToArticle = (id, tag) => {
        const index = isArticle(id);
        if (index !== -1 && tag && typeof tag === 'string' && isContainTag(tag)) {
            articles[index].tags[tags.length] = tag;
            return true;
        } else {
            return false;
        }
    };
    const deleteTagInArticle = (id, tag) => {
        const index = isArticle(id);
        if (index !== -1 && tag && typeof tag === 'string' && isContainTag(tag)) {
            let indexOfTags = -1;
            for (let i = 0; i < articles[index].tags.length; i += 1) {
                if (articles[index].tags[i] === tag) {
                    indexOfTags = i;
                    break;
                }
            }
            if (indexOfTags !== -1) {
                articles[index].tags.splice(indexOfTags, 1);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    const getLength = () => articles.length;
    const reWrite = (obj) => {
        articles = obj;
    };
    const replaceArticles = () => {
        return new Promise((resolve) => {
            dbModel.getArrayOfArticals().then((response) => {
                articles = response;
                resolve('done');
            });
        });
    };

    return {
        getArticles,
        getArticle,
        addArticle,
        validateArticle,
        editArticle,
        isArticle,
        removeArticle,
        addToTagsArray,
        addTagToArticle,
        deleteTagInArticle,
        getLength,
        reWrite,
        replaceArticles,
    };
}());

const articleRenderer = (function () {
    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.newsbox');
    }

    function insertArticlesInDOM(articles) {
        const articlesNodes = renderArticles(articles);
        articlesNodes.forEach((node) => {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderArticles(articles) {
        return articles.map(article => renderArticle(article));
    }

    function renderArticle(article) {
        const template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary.slice(0, 200);
        if (article.summary.length > 200) {
            template.content.querySelector('.article-list-item-summary').textContent = `${article.summary.slice(0, 200)}...`;
        }
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = article.createdAt.toLocaleDateString('ru', options);
        template.content.querySelector('.article-list-title-img').setAttribute('src', article.img);

        const newTags = [];
        for (let i = 0; i < article.tags.length; i += 1) {
            newTags[i] = `#${article.tags[i]}`;
        }

        template.content.querySelector('#article-list-item-tags-first').textContent = newTags[0];
        template.content.querySelector('#article-list-item-tags-second').textContent = newTags[1];
        template.content.querySelector('#article-list-item-tags-third').textContent = newTags[2];
        template.content.querySelector('#article-list-item-tags-fourth').textContent = newTags[3];
        template.content.querySelector('#article-list-item-tags-fifth').textContent = newTags[4];

        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    return {
        init,
        insertArticlesInDOM,
        removeArticlesFromDom,
    };
}());

let countOfArticles = 2;

function startApp() {
    articleModel.replaceArticles().then(
        () => {
            const outArticles = articleModel.getArticles(0, articleModel.getLength());
            if (outArticles) {
                articleModel.reWrite(outArticles);
            }
            countOfArticles += 3;
            if (countOfArticles >= articleModel.getLength()) {
                document.querySelector('.pagination-button').style.visibility = 'hidden';
            }
            articleRenderer.init();
            renderArticles(0, countOfArticles, filter);
            addUserUI();
        });
}

function showMore() {
    if (countOfArticles < articleModel.getLength()) {
        startApp();
        const username = localStorage.getItem('username');
        if (username) {
            const arr = document.getElementsByClassName('delete-item');
            for (let i = 0; i < arr.length; i += 1) {
                arr[i].style.display = 'block';
            }
            const arr2 = document.getElementsByClassName('edit-item');
            for (let i = 0; i < arr.length; i += 1) {
                arr2[i].style.display = 'block';
            }
        }
    }
}

function sortByTime() {
    renderArticles(0, articleModel.getLength());
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
}
function sortByTagSport() {
    articleRenderer.removeArticlesFromDom();
    const NewArticles = articleModel.getArticles(0, 10, {tags: ['sport']});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector('.pagination-button').style.visibility = 'hidden';
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
    if (getSize(NewArticles) === 0) {
        alert('Новости не найдены!');
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        startApp();
        return 0;
    }
}
function sortByTagPolitics() {
    articleRenderer.removeArticlesFromDom();
    const NewArticles = articleModel.getArticles(0, 10, {tags: ['politics']});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector('.pagination-button').style.visibility = 'hidden';
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
    if (getSize(NewArticles) === 0) {
        alert('Новости не найдены!');
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        startApp();
        return 0;
    }
}
function sortByAfiha() {
    articleRenderer.removeArticlesFromDom();
    const NewArticles = articleModel.getArticles(0, 10, {tags: ['fashion']});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector('.pagination-button').style.visibility = 'hidden';
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
    if (getSize(NewArticles) === 0) {
        alert('Новости не найдены!');
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        startApp();
        return 0;
    }
}
function sortByHiTech() {
    articleRenderer.removeArticlesFromDom();
    const NewArticles = articleModel.getArticles(0, 10, {tags: ['hi-tech']});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector('.pagination-button').style.visibility = 'hidden';
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
    if (getSize(NewArticles) === 0) {
        alert('Новости не найдены!');
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        startApp();
        return 0;
    }
}
function sortByBOOM() {
    articleRenderer.removeArticlesFromDom();
    const NewArticles = articleModel.getArticles(0, 10, {tags: ['BOOM']});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector('.pagination-button').style.visibility = 'hidden';
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
    if (getSize(NewArticles) === 0) {
        alert('Новости не найдены!');
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        startApp();
        return 0;
    }
}
function sortByCars() {
    articleRenderer.removeArticlesFromDom();
    const NewArticles = articleModel.getArticles(0, 10, {tags: ['cars']});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector('.pagination-button').style.visibility = 'hidden';
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
    if (getSize(NewArticles) === 0) {
        alert('Новости не найдены!');
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        startApp();
        return 0;
    }
}

function renderArticles(skip, top, filter) {
    articleRenderer.removeArticlesFromDom();
    const NewArticles = articleModel.getArticles(skip, top, filter);
    articleRenderer.insertArticlesInDOM(NewArticles);
}

document.addEventListener('DOMContentLoaded', startApp);

function getSize(mas) {
    let temp = [];
    temp = mas;
    return temp.length;
}
