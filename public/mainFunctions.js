"use strict";
let articleModel = (function () {

    let idNews = 0;
    let arrayOfTags = ["cars", "politics", "hi-tech", "sport", "fashion", "BOOM", "Russia", "IT"];
    let articles = [{}];
    let getArticles,getArticle,validateArticle,findTag,addArticle,editArticle,isArticle,removeArticle,isContainTag,addToTagsArray,addTagToArticle,deleteTagInArticle,getLength,reWrite,stringToDate,replaceArticles;

    getArticles = (skip, top, filterConfig) =>{
        if (skip == undefined) {
            skip = 0;
        }
        if (skip >= articles.length) {
            return null;
        }
        if (top == undefined) {
            top = 10;
        }

        articles.sort(function comparator(a, b) {
            return b.createdAt - a.createdAt;
        });

        let newArticles = [];

        if (filterConfig == undefined) {
            for (let i = skip; i < articles.length && i < top + skip; i++) {
                newArticles.push(articles[i]);
            }
        } else {
            if (filterConfig.author != undefined && filterConfig.tags != undefined && filterConfig.createdAt != undefined) {
                for (let i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author == articles[i].author && findTag(filterConfig.tags, articles[i].tags)
                        && filterConfig.createdAt.getTime() == articles[i].createdAt.getTime()) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author != undefined && filterConfig.tags != undefined && filterConfig.createdAt == undefined) {
                for (let i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author == articles[i].author && findTag(filterConfig.tags, articles[i].tags)) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author != undefined && filterConfig.tags == undefined && filterConfig.createdAt != undefined) {
                for (let i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author == articles[i].author && filterConfig.createdAt.getTime() == articles[i].createdAt.getTime()) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author != undefined && filterConfig.tags == undefined && filterConfig.createdAt == undefined) {
                for (let i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author == articles[i].author) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author == undefined && filterConfig.tags != undefined && filterConfig.createdAt != undefined) {
                for (let i = skip; i < articles.length && i < top + skip; i++) {
                    if (findTag(filterConfig.tags, articles[i].tags) && filterConfig.createdAt.getTime() == articles[i].createdAt.getTime()) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author == undefined && filterConfig.tags != undefined && filterConfig.createdAt == undefined) {
                for (let i = skip; i < articles.length && i < top + skip; i++) {
                    if (findTag(filterConfig.tags, articles[i].tags)) {
                        newArticles.push(articles[i]);
                    }
                }
            }

            if (filterConfig.author == undefined && filterConfig.tags == undefined && filterConfig.createdAt != undefined) {
                for (let i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.createdAt.getFullYear() == articles[i].createdAt.getFullYear()&&filterConfig.createdAt.getDate() == articles[i].createdAt.getDate()&&filterConfig.createdAt.getMonth() == articles[i].createdAt.getMonth()){
                        newArticles.push(articles[i]);
                    }
                }
            }

        }
        return newArticles;
    };
    findTag = (tag, arrayOfTags) => {
        for (let i = 0; i < arrayOfTags.length; i++) {
            if (tag == arrayOfTags[i]) {
                return true;
            }
        }
        return false;
    };
    getArticle = (id) => { let index = isArticle(id);
        if (index == -1) {
            return null;
        } else {
            return articles[index];
        }
    };
    validateArticle = (article) =>{
        if ((typeof(article.id) == "number")
            && (typeof(article.title) == "string" && article.title.length < 100 && article.title != null )
            && (typeof(article.summary) == "string" && article.summary.length < 200)
            && (typeof(article.createdAt) == "object")
            && (typeof(article.author) == "string" && article.author != null)
            && (typeof(article.content) == "string" && article.content != null)
            && (article.tags && article.tags.length > 0)) {
            return true;
        }
        else
            return false;
    };
    addArticle = (article) => {
        if (validateArticle(article)) {
            articles.push(article);
            return true;
        }
        else
            return false;
    };
    editArticle = (id, article) =>{
        let index = isArticle(id);
        if (index == -1) {
            return false;
        }
        if (article.id != undefined && article.author != undefined && article.createdAt != undefined) {
            return false;
        }
        if (article.title != undefined && typeof article.title == "string" && article.title.length > 0 &&
            article.title.length <= 100) {
            articles[index].title = article.title;
        }
        if (article.summary != undefined && typeof article.summary == "string" && article.summary.length > 0 &&
            article.summary.length <= 200) {
            articles[index].summary = article.summary;

        }
        if (article.content != undefined && typeof article.content == "string" && article.content.length > 0) {
            articles[index].content = article.content;
        }
        if (article.img != undefined && typeof article.img == "string" && article.img.length > 0) {
            articles[index].img = article.img;
        }
        if (article.tags != undefined && article.tags.length >= 1 && article.tags.length <= 5) {
            articles[index].tags = article.tags;
        }
        return true;
    };
    isArticle = (id) =>{
        let res = -1;
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].id == id) {
                return i;
            }
        }
        return res;
    };
    removeArticle = (id) => {
        let index = isArticle(id);
        if (index == -1) {
            return false;
        } else {
            articles.splice(index, 1);
            return true;
        }
    };
    isContainTag = (tag) => {
        if (tag != undefined && typeof tag == "string") {
            for (let i = 0; i < arrayOfTags.length; i++) {
                if (tag === arrayOfTags[i]) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    };
    addToTagsArray = (tag) => {
        let index = arrayOfTags.length;
        for (let i = 0; i < tag.length; i++) {
            if (!isContainTag(tag[i]))
                arrayOfTags[index++] = tag[i];
        }
    };
    addTagToArticle = (id,tag) =>{
        let index = isArticle(id);
        if (index != -1 && tag != undefined && typeof tag == "string" && isContainTag(tag)) {
            articles[index].tags[tags.length] = tag;
            return true;
        } else {
            return false;
        }
    };
    deleteTagInArticle = (id,tag) =>{
        let index = isArticle(id);
        if (index != -1 && tag != undefined && typeof tag == "string" && isContainTag(tag)) {
            let indexOfTags = -1;
            for (let i = 0; i < articles[index].tags.length; i++) {
                if (articles[index].tags[i] == tag) {
                    indexOfTags = i;
                    break;
                }
            }
            if (indexOfTags != -1) {
                articles[index].tags.splice(indexOfTags, 1);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    getLength = () =>{
        return articles.length;
    };
    reWrite = (obj) => {
        articles = obj;
    };
    replaceArticles = () =>{
        return new Promise(resolve => {
            dbModel.getArrayOfArticals().then(response => {
                articles = response;
                resolve("done");
            });
        })
    };

    return {
        getArticles: getArticles,
        getArticle: getArticle,
        addArticle: addArticle,
        validateArticle: validateArticle,
        editArticle: editArticle,
        isArticle: isArticle,
        removeArticle: removeArticle,
        addToTagsArray: addToTagsArray,
        addTagToArticle: addTagToArticle,
        deleteTagInArticle: deleteTagInArticle,
        getLength: getLength,
        reWrite: reWrite,
        replaceArticles: replaceArticles,
        idNews: idNews
    };
}());

let articleRenderer = (function () {
    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.newsbox');
    }

    function insertArticlesInDOM(articles) {
        let articlesNodes = renderArticles(articles);
        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderArticles(articles) {
        return articles.map(function (article) {
            return renderArticle(article);
        });
    }

    function renderArticle(article) {
        let template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary.slice(0,200);
          if(article.summary.length > 200) {
              template.content.querySelector('.article-list-item-summary').textContent = article.summary.slice(0, 200) + "...";
          }
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = article.createdAt.toLocaleDateString("ru", options);
        template.content.querySelector('.article-list-title-img').setAttribute("src", article.img);

        let newTags = [];
        for (let i = 0; i < article.tags.length; i++) {
            newTags[i] = "#" + article.tags[i];
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
        second: 'numeric'
    };

    return {
        init: init,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDom: removeArticlesFromDom
    };
}());

let countOfArticles = 2;

function startApp() {
    articleModel.replaceArticles().then(
        ready => {
            let outArticles = articleModel.getArticles(0, articleModel.getLength());
            if (outArticles) {
                articleModel.reWrite(outArticles);
            }
            countOfArticles += 3;
            if (countOfArticles >= articleModel.getLength()) {
                document.querySelector(".pagination-button").style.visibility = "hidden";
            }
            articleRenderer.init();
            renderArticles(0, countOfArticles, filter);
            addUserUI();
        }
    );
}

function showMore() {
    if (countOfArticles < articleModel.getLength()) {
        startApp();
        let username = localStorage.getItem("username");
        if (username) {
            let arr = document.getElementsByClassName("delete-item");
            for (let i = 0; i < arr.length; i++) {
                arr[i].style.display = "block";
            }
            let arr2 = document.getElementsByClassName(" edit-item");
            for (let i = 0; i < arr.length; i++) {
                arr2[i].style.display = "block";
            }
        }
    }
}

function sortByTime() {
    renderArticles(0, articleModel.getLength());
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
}
function sortByTagSport() {
    articleRenderer.removeArticlesFromDom();
    let NewArticles = articleModel.getArticles(0, 10, {tags: ["sport"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
    if (getSize(NewArticles) == 0) {
        alert("Новости не найдены!");
        document.querySelector(".main-page").style.display = "inline-block";
        document.querySelector(".edit-news").style.display = "none";
        document.querySelector(".full-news").style.display = "none";
        document.querySelector(".block-add-news").style.display = "none";
        document.querySelector(".in").style.display = "none";
        startApp();
        return 0;
    }
}
function sortByTagPolitics() {
    articleRenderer.removeArticlesFromDom();
    let NewArticles = articleModel.getArticles(0, 10, {tags: ["politics"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
    if (getSize(NewArticles) == 0) {
        alert("Новости не найдены!");
        document.querySelector(".main-page").style.display = "inline-block";
        document.querySelector(".edit-news").style.display = "none";
        document.querySelector(".full-news").style.display = "none";
        document.querySelector(".block-add-news").style.display = "none";
        document.querySelector(".in").style.display = "none";
        startApp();
        return 0;
    }
}
function sortByAfiha() {
    articleRenderer.removeArticlesFromDom();
    let NewArticles = articleModel.getArticles(0, 10, {tags: ["fashion"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
    if (getSize(NewArticles) == 0) {
        alert("Новости не найдены!");
        document.querySelector(".main-page").style.display = "inline-block";
        document.querySelector(".edit-news").style.display = "none";
        document.querySelector(".full-news").style.display = "none";
        document.querySelector(".block-add-news").style.display = "none";
        document.querySelector(".in").style.display = "none";
        startApp();
        return 0;
    }
}
function sortByHiTech() {
    articleRenderer.removeArticlesFromDom();
    let NewArticles = articleModel.getArticles(0, 10, {tags: ["hi-tech"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
    if (getSize(NewArticles) == 0) {
        alert("Новости не найдены!");
        document.querySelector(".main-page").style.display = "inline-block";
        document.querySelector(".edit-news").style.display = "none";
        document.querySelector(".full-news").style.display = "none";
        document.querySelector(".block-add-news").style.display = "none";
        document.querySelector(".in").style.display = "none";
        startApp();
        return 0;
    }
}
function sortByBOOM() {
    articleRenderer.removeArticlesFromDom();
    let NewArticles = articleModel.getArticles(0, 10, {tags: ["BOOM"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
    if (getSize(NewArticles) == 0) {
        alert("Новости не найдены!");
        document.querySelector(".main-page").style.display = "inline-block";
        document.querySelector(".edit-news").style.display = "none";
        document.querySelector(".full-news").style.display = "none";
        document.querySelector(".block-add-news").style.display = "none";
        document.querySelector(".in").style.display = "none";
        startApp();
        return 0;
    }
}
function sortByCars() {
    articleRenderer.removeArticlesFromDom();
    let NewArticles = articleModel.getArticles(0, 10, {tags: ["cars"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
    if (getSize(NewArticles) == 0) {
        alert("Новости не найдены!");
        document.querySelector(".main-page").style.display = "inline-block";
        document.querySelector(".edit-news").style.display = "none";
        document.querySelector(".full-news").style.display = "none";
        document.querySelector(".block-add-news").style.display = "none";
        document.querySelector(".in").style.display = "none";
        startApp();
        return 0;
    }
}

function renderArticles(skip, top, filter) {
    articleRenderer.removeArticlesFromDom();
    let NewArticles = articleModel.getArticles(skip, top, filter);
    articleRenderer.insertArticlesInDOM(NewArticles);
}

document.addEventListener('DOMContentLoaded', startApp);

function getSize(mas) {
    let temp = [];
    temp = mas;
    return temp.length;
}
