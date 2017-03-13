
var articleModel = (function () {

    var idNews = 0;
    var allTags = ["cars", "politics", "hi-tech", "sport", "fashion", "BOOM", "Russia", "IT"];

    var articles = [
        {
            id: ++idNews,
            title: 'Trump signs new immigration order',
            summary: 'What is different about the new order?What is different about the new order?What is different about the new order?What is different about the new order?What is different about the new order?',
            createdAt: new Date( 2017,00,27,23,35,00),
            author: 'Vladislav Zinchuk',
            content: 'President Donald Trump has signed a new executive order placing a 90-day ban on people from six mainly Muslim nations.',
            tags: ["politics", "Russia"],
            img : 'images/slide2.jpg'
        },
        {
            id: ++idNews,
            title: "IBM's online quantum machine gets faster",
            summary: 'Tricky problem',
            createdAt: new Date(2017,03,27,5,14,33),
            author: 'Vasia Baranov ',
            content: 'IBM has made its quantum computing system commercially available to businesses and beefed up an existing system used by the research community.',
            tags: ["cars", "hi-tech"],
            img : 'images/slide3.jpg'
        },
        {
            id: ++idNews,
            title: 'Gilmore Girls: The case for and against another return',
            summary: 'Gilmore Girls could be returning to our screens. Again.',
            createdAt: new Date(2012,06,2,6,32,31),
            author: 'Maria Lopova',
            content: 'The show originally ran from 2000 to 2007 but Netflix revived it last year for four feature-length specials.',
            tags: ["fashion"],
            img : 'images/slide1.jpg'
        },
        {
            id: ++idNews,
            title: "Google's fake news Snippets",
            summary: 'Algorithms that sometimes struggle',
            createdAt: new Date(2017,03,27,22,14,40),
            author: 'Pavel Rykov',
            content: 'It will now face increasing pressure to introduce more human oversight of algorithms that sometimes struggle to differentiate between facts and fake news.',
            tags: ["BOOM", "Russia", "IT"],
            img : 'images/slide6.jpg'
        },
        {
            id: ++idNews,
            title: 'Prize for cracking brain feel good system',
            summary: "The UK based winners cracked the brain's reward centre",
            createdAt: new Date(2017,05,3,17,14,20),
            author: 'James Gallagher',
            content: "Three UK-based scientists have won a prestigious prize worth 1m euros for studying the brain's reward centre.",
            tags: ["hi-tech", "sport"],
            img : 'images/slide2.jpg'
        }
    ];

    function getArticles(skip, top, filterConfig) {
        if (skip == undefined)
            skip = 0;
        if (top == undefined)
            return 0 ;
        if (skip > top)
            return 0;
        if(top > articles.length)
            top = articles.length;

        var newArticals = [];
        var countOfArticals = 0;
        if (filterConfig == undefined) {
            for (var i = skip; i < top + skip; i++) {
                newArticals[countOfArticals] = articles[i];
                countOfArticals++;
            }
        }
        if (filterConfig && filterConfig.tags == undefined) {
            for (var i = skip; i < top + skip && i < idNews; i++) {
                if (filterConfig.author == articles[i].author) {
                    newArticals[countOfArticals] = articles[i];
                    countOfArticals++;
                }
            }
        }
        if (filterConfig && filterConfig.tags != undefined) {
            for (var i = skip; i < top + skip && i < idNews; i++) {
                for (var k = 0; k < filterConfig.tags.length; k++)
                    for (var t = 0; t < articles[i].tags.length; t++)
                        if (articles[i].tags[t] == filterConfig.tags[k]) {
                            newArticals[countOfArticals] = articles[i];
                            countOfArticals++;
                            t = articles[i].tags.length;
                            k = filterConfig.tags.length;
                        }
            }
        }

        newArticals.sort(function (a, b) {
                return (a.createdAt < b.createdAt) - (b.createdAt < a.createdAt)
            }
        );
        return newArticals;
    }

    function getArticle(id) {
        if (idNews >= id)
            return articles[+id - 1];
        else
            return 0;
    }

    function validateArticle(article) {
        if ((typeof(article.id) == "number")
            && (typeof(article.title) == "string" && article.title.length < 100 && article.title != null )
            && (typeof(article.summary) == "string" && article.summary.length < 200)
            && (typeof(article.createdAt) == "object")
            && (typeof(article.author) == "string" && article.author != null)
            && (typeof(article.content) == "string" && article.content != null)
            && (article.tags && article.tags.length > 0))
        {
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

    function editArticle(id, newArticle) {
        if (idNews >= id) {
            if (validateArticle(articles[+id - 1]) == true) {
                if (newArticle.content != undefined)
                    articles[+id - 1].content = newArticle.content;
                if (newArticle.summary != undefined)
                    articles[+id - 1].summary = newArticle.summary;
                if (newArticle.title != undefined)
                    articles[+id - 1].title = newArticle.title;
            }
            else
                return 0;
        }
        else
            return 0;
    }

    function removeArticle(id) {
        if (idNews >= id) {
            articles.splice(+id - 1, 1)
            return true;
        }
        else return false;
    }

    function addTag(id, tag) {
        if (isOldTag(tag) == true) {
            if (id <= idNews) {
                var size = articles[+id - 1].tags.length;
                articles[+id - 1].tags.splice(size + 1, 0, tag);
                return true;
            }
        }
        else return false;
    }

    function deleteTag(id, tag) {
        var position;
        if (id <= idNews) {
            size = articles[+id - 1].tags.length;
            for (var i = 0; i < size; i++) {
                if (articles[+id - 1].tags[i] == tag)
                    position = i;
            }
            articles[+id - 1].tags.splice(i - 1, 1);
            return true;
        }
        else return false;
    }

    function isOldTag(tag) {
        for (var i = 0; allTags.length > i; i++)
            if (allTags[i] == tag)
                return true;
        return false;
    }


    return {
        getArticles: getArticles,
        addArticle: addArticle,
        validateArticle: validateArticle,
        editArticle: editArticle,
        removeArticle: removeArticle,
        addTag: addTag,
        deleteTag: deleteTag
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

    function removeArticlesFromDom () {
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
        template.content.querySelector('.article-list-item-date').textContent = article.createdAt.toLocaleDateString("ru",options);
        template.content.querySelector('.article-list-title-img').setAttribute("src",article.img);

        var newTags=[];
        for(var i=0;i<article.tags.length;i++){
            newTags[i]="#"+article.tags[i];
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

document.addEventListener('DOMContentLoaded', startApp);


function startApp() {
    articleRenderer.init();
    renderArticles();
}


function renderArticles(skip, top) {
    // 1. Удалим статьи из HTML
    articleRenderer.removeArticlesFromDom();

    // 2. Достанем статьи из модели

    articles = articleModel.getArticles(0,19);

    // 3. Отобразим статьи
    articleRenderer.insertArticlesInDOM(articles);
}