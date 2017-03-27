var articleModel = (function ()     {

    var idNews = 0;
    var tags = ["cars", "politics", "hi-tech", "sport", "fashion", "BOOM", "Russia", "IT"];

    var articles = [
        {
            id: ++idNews,
            title: 'Trump signs new immigration order',
            summary: 'What is different about the new order?What is different about the new order?What is different about the new order?What is different about the new order?What is different about the new order?',
            createdAt: new Date(2016, 00, 27, 23, 35, 00),
            author: 'Vladislav Zinchuk',
            content: 'President Donald Trump has signed a new executive order placing a 90-day ban on people from six mainly Muslim nations.',
            tags: ["politics", "Russia"],
            img: 'images/slide2.jpg'
        },
        {
            id: ++idNews,
            title: "IBM's online quantum machine gets faster",
            summary: 'Tricky problem',
            createdAt: new Date(2015, 03, 27, 5, 14, 33),
            author: 'Vasia Baranov',
            content: 'IBM has made its quantum computing system commercially available to businesses and beefed up an existing system used by the research community.',
            tags: ["cars", "hi-tech"],
            img: 'images/slide3.jpg'
        },
        {
            id: ++idNews,
            title: 'Gilmore Girls: The case for and against another return',
            summary: 'Gilmore Girls could be returning to our screens. Again.',
            createdAt: new Date(2014, 06, 2, 6, 32, 31),
            author: 'Maria Lopova',
            content: 'The show originally ran from 2000 to 2007 but Netflix revived it last year for four feature-length specials.',
            tags: ["fashion"],
            img: 'images/slide1.jpg'
        },
        {
            id: ++idNews,
            title: "Google's fake news Snippets",
            summary: 'Algorithms that sometimes struggle',
            createdAt: new Date(2013, 03, 27, 22, 14, 40),
            author: 'Pavel Rykov',
            content: 'It will now face increasing pressure to introduce more human oversight of algorithms that sometimes struggle to differentiate between facts and fake news.',
            tags: ["BOOM", "Russia", "IT"],
            img: 'images/slide6.jpg'
        },
        {
            id: ++idNews,
            title: 'Prize for cracking brain feel good system',
            summary: "The UK based winners cracked the brain's reward centre",
            createdAt: new Date(2012, 05, 3, 17, 14, 20),
            author: 'James Gallagher',
            content: "Three UK-based scientists have won a prestigious prize worth 1m euros for studying the brain's reward centre.",
            tags: ["hi-tech", "sport"],
            img: 'images/slide2.jpg'
        }, {
            id: ++idNews,
            title: 'Trump signs new immigration order',
            summary: 'What is different about the new order?What is different about the new order?What is different about the new order?What is different about the new order?What is different about the new order?',
            createdAt: new Date(2011, 00, 27, 23, 35, 00),
            author: 'Vladislav Zinchuk',
            content: 'President Donald Trump has signed a new executive order placing a 90-day ban on people from six mainly Muslim nations.',
            tags: ["politics", "Russia"],
            img: 'images/slide2.jpg'
        },
        {
            id: ++idNews,
            title: "IBM's online quantum machine gets faster",
            summary: 'Tricky problem',
            createdAt: new Date(2010, 03, 27, 5, 14, 33),
            author: 'Vasia Baranov ',
            content: 'IBM has made its quantum computing system commercially available to businesses and beefed up an existing system used by the research community.',
            tags: ["cars", "hi-tech"],
            img: 'images/slide3.jpg'
        },
        {
            id: ++idNews,
            title: 'Gilmore Girls: The case for and against another return',
            summary: 'Gilmore Girls could be returning to our screens. Again.',
            createdAt: new Date(2009, 06, 2, 6, 32, 31),
            author: 'Maria Lopova',
            content: 'The show originally ran from 2000 to 2007 but Netflix revived it last year for four feature-length specials.',
            tags: ["fashion"],
            img: 'images/slide1.jpg'
        },
        {
            id: ++idNews,
            title: "Google's fake news Snippets",
            summary: 'Algorithms that sometimes struggle',
            createdAt: new Date(2008, 03, 27, 22, 14, 40),
            author: 'Pavel Rykov',
            content: 'It will now face increasing pressure to introduce more human oversight of algorithms that sometimes struggle to differentiate between facts and fake news.',
            tags: ["BOOM", "Russia", "IT"],
            img: 'images/slide6.jpg'
        },
        {
            id: ++idNews,
            title: 'Prize for cracking brain feel good system',
            summary: "The UK based winners cracked the brain's reward centre",
            createdAt: new Date(2007, 05, 3, 17, 14, 20),
            author: 'James Gallagher',
            content: "Three UK-based scientists have won a prestigious prize worth 1m euros for studying the brain's reward centre.",
            tags: ["hi-tech", "sport"],
            img: 'images/slide2.jpg'
        }
    ];

    function getArticles(skip, top, filterConfig) {
        if (skip == undefined) {
            skip = 0;
        }
        if (skip >= articles.length) {
            return null;
        }
        if (top == undefined) {
            top = 10;
        }

        var newArticles = [];
        var index = 0;

        if (filterConfig == undefined) {
            for (var i = skip; i < articles.length && i < top + skip; i++) {
                newArticles[index] = articles[i];
                index++;
            }
        } else {
            if (filterConfig.author != undefined && filterConfig.tags != undefined && filterConfig.createdAt != undefined) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author == articles[i].author && findTag(filterConfig.tags, articles[i].tags)
                        && filterConfig.createdAt.getTime() == articles[i].createdAt.getTime()) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author != undefined && filterConfig.tags != undefined && filterConfig.createdAt == undefined) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author == articles[i].author && findTag(filterConfig.tags, articles[i].tags)) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author != undefined && filterConfig.tags == undefined && filterConfig.createdAt != undefined) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author == articles[i].author && filterConfig.createdAt.getTime() == articles[i].createdAt.getTime()) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author != undefined && filterConfig.tags == undefined && filterConfig.createdAt == undefined) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.author == articles[i].author) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author == undefined && filterConfig.tags != undefined && filterConfig.createdAt != undefined) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (findTag(filterConfig.tags, articles[i].tags) && filterConfig.createdAt.getTime() == articles[i].createdAt.getTime()) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author == undefined && filterConfig.tags != undefined && filterConfig.createdAt == undefined) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (findTag(filterConfig.tags, articles[i].tags)) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

            if (filterConfig.author == undefined && filterConfig.tags == undefined && filterConfig.createdAt != undefined) {
                for (var i = skip; i < articles.length && i < top + skip; i++) {
                    if (filterConfig.createdAt.getTime() == articles[i].createdAt.getTime()) {
                        newArticles[index] = articles[i];
                        index++;
                    }
                }
            }

        }
        newArticles.sort(function comparator(a, b) {
            return b.createdAt - a.createdAt;
        });
        return newArticles;
    }

    function findTag(tag, tags) {
        for (var i = 0; i < tags.length; i++) {
            if (tag == tags[i]) {
                return true;
            }
        }
        return false;
    }

    function getArticle(id) {
        var index = isArticle(id);
        if (index == -1) {
            return null;
        } else {
            return articles[index];
        }
    }

    function validateArticle(article) {
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
    }

    function addArticle(article) {
        if (validateArticle(article)) {
            articles[articles.length] = article;
            return true;
        }
        else
            return false;
    }

    function editArticle(id, article) {
        var index = isArticle(id);
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
        if (article.tags != undefined && article.tags.length >= 1 && article.tags.length <= 5) {
            articles[index].tags = article.tags;
        }
        return true;
    }

    function isArticle(id) {
        var res = -1;
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].id == id) {
                return i;
            }
        }
        return res;
    }

    function removeArticle(id) {
        var index = isArticle(id);
        if (index == -1) {
            return false;
        } else {
            articles.splice(index, 1);
            return true;
        }
    }

    function isContainTag(tag) {
        if (tag != undefined && typeof tag == "string") {
            for (var i = 0; i < tags.length; i++) {
                if (tag === tags[i]) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    function addToTagsArray(tag) {
        var index = tags.length;
        for (var i = 0; i < tag.length; i++) {
            if (!isContainTag(tag[i]))
                tags[index++] = tag[i];
        }
    }

    function addTagToArticle(id, tag) {
        var index = isArticle(id);
        if (index != -1 && tag != undefined && typeof tag == "string" && isContainTag(tag)) {
            articles[index].tags[tags.length] = tag;
            return true;
        } else {
            return false;
        }
    }

    function deleteTagInArticle(id, tag) {
        var index = isArticle(id);
        if (index != -1 && tag != undefined && typeof tag == "string" && isContainTag(tag)) {
            var indexOfTags = -1;
            for (var i = 0; i < articles[index].tags.length; i++) {
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
    }

    function getLenth() {
        return articles.length;
    }

    function reWrite(obj) {
        articles = obj;
    }

    function stringToDate(obj) {
        for(var i = 0 ; i < obj.length; i++){
            obj[i].createdAt = new Date(obj[i].createdAt);
        }
    }

    function getArticleByTime(time) {
        for (var i = 0; i < articles.length; i++) {
            if (articles[i].createdAt == time) {
            }
            return articles[i];
        }
    }
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
        getLenth: getLenth,
        reWrite: reWrite,
        stringToDate: stringToDate,
        getArticleByTime : getArticleByTime,
        idNews: idNews
    };
}());

var articleRenderer = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;

    function init() {
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.newsbox');
    }

    function insertArticlesInDOM(articles) {
        var articlesNodes = renderArticles(articles);
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
        var template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = article.createdAt.toLocaleDateString("ru", options);
        template.content.querySelector('.article-list-title-img').setAttribute("src", article.img);

        var newTags = [];
        for (var i = 0; i < article.tags.length; i++) {
            newTags[i] = "#" + article.tags[i];
        }

        template.content.querySelector('#article-list-item-tags-first').textContent = newTags[0];
        template.content.querySelector('#article-list-item-tags-second').textContent = newTags[1];
        template.content.querySelector('#article-list-item-tags-third').textContent = newTags[2];
        template.content.querySelector('#article-list-item-tags-fourth').textContent = newTags[3];
        template.content.querySelector('#article-list-item-tags-fifth').textContent = newTags[4];

        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    var options = {
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

var countOfArticals = 2;
var tem = JSON.parse(localStorage.getItem("newArticals"));

function startApp() {
    if(tem) {
        articleModel.stringToDate(tem);
        articleModel.reWrite(tem);
    }
    countOfArticals+=3;
    if(countOfArticals >= articleModel.getLenth())
        document.querySelector(".pagination-button").style.visibility = "hidden";
    articleRenderer.init();
    renderArticles(0,countOfArticals);
}

function showMore() {
    if(countOfArticals < articleModel.getLenth())
        startApp();
}

function sortByTime() {
    renderArticles(0, articleModel.getLenth());
}

function sortByTagSport() {
    articleRenderer.removeArticlesFromDom();
    var NewArticles = articleModel.getArticles(0,10,{tags: ["sport"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
}

function sortByTagPolitics() {
    articleRenderer.removeArticlesFromDom();
    var NewArticles = articleModel.getArticles(0, 10, {tags: ["politics"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    if (getSize(NewArticles) == 0)
    {
        alert("Новости не найдены!");
        return 0;
    }
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
}

function sortByAfiha(){
    articleRenderer.removeArticlesFromDom();
    var NewArticles = articleModel.getArticles(0,10,{tags: ["fashion"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    if (getSize(NewArticles) == 0)
    {
        alert("Новости не найдены!");
        return 0;
    }
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
}

function sortByHiTech(){
    articleRenderer.removeArticlesFromDom();
    var NewArticles = articleModel.getArticles(0,10,{tags: ["hi-tech"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    if (getSize(NewArticles) == 0)
    {
        alert("Новости не найдены!");
        return 0;
    }
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
}

function sortByBOOM(){
    articleRenderer.removeArticlesFromDom();
    var NewArticles = articleModel.getArticles(0,10,{tags: ["BOOM"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    if (getSize(NewArticles) == 0)
    {
        alert("Новости не найдены!");
        return 0;
    }
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
}
function sortByCars() {
    articleRenderer.removeArticlesFromDom();
    var NewArticles = articleModel.getArticles(0,10,{tags: ["cars"]});
    articleRenderer.insertArticlesInDOM(NewArticles);
    if (getSize(NewArticles) == 0)
    {
        alert("Новости не найдены!");
        return 0;
    }
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
}

function renderArticles(skip, top, filter) {
    articleRenderer.removeArticlesFromDom();
    var NewArticles = articleModel.getArticles(skip, top, filter);
    articleRenderer.insertArticlesInDOM(NewArticles);
}

document.addEventListener('DOMContentLoaded', startApp);

function getSize(mas) {
    var temp = [];
    temp = mas;
    return temp.length;
}
