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
    const validateArticle = article => (
    (typeof (article.title) === 'string' && article.title.length < 100 && article.title != null)
    && (typeof (article.summary) === 'string' && article.summary.length < 200)
    && (typeof (article.createdAt) === 'object')
    && (typeof (article.author) === 'string' && article.author != null)
    && (typeof (article.content) === 'string' && article.content != null)
    && (article.tags && article.tags.length > 0));
    const isArticle = (id) => {
        const res = -1;
        for (let i = 0; i < articles.length; i += 1) {
            if (articles[i]._id === id) {
                return i;
            }
        }
        return res;
    };
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
        validateArticle,
        isArticle,
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
        template.content.querySelector('.article-list-item').dataset.id = article._id;
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

let countOfArticles = 3;
let presentCount;
function startApp() {
    articleModel.replaceArticles().then(
        () => {
            dbModel.getArrayOfArticals().then((NewArticles) => {
                presentCount = NewArticles.length;
                countOfArticles += 3;
                if (countOfArticles >= NewArticles.length) {
                    document.querySelector('.pagination-button').style.visibility = 'hidden';
                }
            });
            articleRenderer.init();
            renderArticles(0, countOfArticles, filter).then(() => {
                addUserUI();
            });
        });
    getInformation();
}

function showMore() {
    if (countOfArticles < presentCount) {
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
    renderArticles(0, presentCount);
    document.querySelector('.main-page').style.display = 'inline-block';
    document.querySelector('.edit-news').style.display = 'none';
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector('.block-add-news').style.display = 'none';
    document.querySelector('.in').style.display = 'none';
}
function sortByTagSport() {
    dbModel.getArrayOfArticals(0, 10, {tags: ['sport']}).then((NewArticles) => {
        articleRenderer.removeArticlesFromDom();
        articleRenderer.insertArticlesInDOM(NewArticles);
        document.querySelector('.pagination-button').style.visibility = 'hidden';
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        if (NewArticles.length === 0) {
            alert('Новости не найдены!');
            document.querySelector('.main-page').style.display = 'inline-block';
            document.querySelector('.edit-news').style.display = 'none';
            document.querySelector('.full-news').style.display = 'none';
            document.querySelector('.block-add-news').style.display = 'none';
            document.querySelector('.in').style.display = 'none';
            startApp();
        }
    });
}
function sortByTagPolitics() {
    dbModel.getArrayOfArticals(0, 10, {tags: ['politics']}).then((NewArticles) => {
        articleRenderer.removeArticlesFromDom();
        articleRenderer.insertArticlesInDOM(NewArticles);
        document.querySelector('.pagination-button').style.visibility = 'hidden';
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        if (NewArticles.length === 0) {
            alert('Новости не найдены!');
            document.querySelector('.main-page').style.display = 'inline-block';
            document.querySelector('.edit-news').style.display = 'none';
            document.querySelector('.full-news').style.display = 'none';
            document.querySelector('.block-add-news').style.display = 'none';
            document.querySelector('.in').style.display = 'none';
            startApp();
        }
    });
}
function sortByAfiha() {
    dbModel.getArrayOfArticals(0, 10, {tags: ['fashion']}).then((NewArticles) => {
        articleRenderer.removeArticlesFromDom();
        articleRenderer.insertArticlesInDOM(NewArticles);
        document.querySelector('.pagination-button').style.visibility = 'hidden';
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        if (NewArticles.length === 0) {
            alert('Новости не найдены!');
            document.querySelector('.main-page').style.display = 'inline-block';
            document.querySelector('.edit-news').style.display = 'none';
            document.querySelector('.full-news').style.display = 'none';
            document.querySelector('.block-add-news').style.display = 'none';
            document.querySelector('.in').style.display = 'none';
            startApp();
        }
    });
}
function sortByHiTech() {
    dbModel.getArrayOfArticals(0, 10, {tags: ['hi-tech']}).then((NewArticles) => {
        articleRenderer.removeArticlesFromDom();
        articleRenderer.insertArticlesInDOM(NewArticles);
        document.querySelector('.pagination-button').style.visibility = 'hidden';
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        if (NewArticles.length === 0) {
            alert('Новости не найдены!');
            document.querySelector('.main-page').style.display = 'inline-block';
            document.querySelector('.edit-news').style.display = 'none';
            document.querySelector('.full-news').style.display = 'none';
            document.querySelector('.block-add-news').style.display = 'none';
            document.querySelector('.in').style.display = 'none';
            startApp();
        }
    });
}
function sortByBOOM() {
    dbModel.getArrayOfArticals(0, 10, {tags: ['BOOM']}).then((NewArticles) => {
        articleRenderer.removeArticlesFromDom();
        articleRenderer.insertArticlesInDOM(NewArticles);
        document.querySelector('.pagination-button').style.visibility = 'hidden';
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        if (NewArticles.length === 0) {
            alert('Новости не найдены!');
            document.querySelector('.main-page').style.display = 'inline-block';
            document.querySelector('.edit-news').style.display = 'none';
            document.querySelector('.full-news').style.display = 'none';
            document.querySelector('.block-add-news').style.display = 'none';
            document.querySelector('.in').style.display = 'none';
            startApp();
        }
    });
}
function sortByCars() {
    dbModel.getArrayOfArticals(0, 10, {tags: ['cars']}).then((NewArticles) => {
        articleRenderer.removeArticlesFromDom();
        articleRenderer.insertArticlesInDOM(NewArticles);
        document.querySelector('.pagination-button').style.visibility = 'hidden';
        document.querySelector('.main-page').style.display = 'inline-block';
        document.querySelector('.edit-news').style.display = 'none';
        document.querySelector('.full-news').style.display = 'none';
        document.querySelector('.block-add-news').style.display = 'none';
        document.querySelector('.in').style.display = 'none';
        if (NewArticles.length === 0) {
            alert('Новости не найдены!');
            document.querySelector('.main-page').style.display = 'inline-block';
            document.querySelector('.edit-news').style.display = 'none';
            document.querySelector('.full-news').style.display = 'none';
            document.querySelector('.block-add-news').style.display = 'none';
            document.querySelector('.in').style.display = 'none';
            startApp();
        }
    });
}

function renderArticles(skip, top, filter) {
    return new Promise((resolve, reject) => {
        articleRenderer.removeArticlesFromDom();
        dbModel.getArrayOfArticals(skip, top, filter).then((NewArticles) => {
            articleRenderer.insertArticlesInDOM(NewArticles);
            resolve();
        });
    });
}

document.addEventListener('DOMContentLoaded', startApp);

