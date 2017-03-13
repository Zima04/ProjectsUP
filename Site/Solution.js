var idNews = 0;
var allTags = ["cars", "politics", "hi-tech", "sport", "fashion", "BOOM", "Russia", "IT"];

var articles = [
    {
        id: ++idNews,
        title: 'Trump signs new immigration order',
        summary: 'What is different about the new order?',
        createdAt: new Date('2017-02-27T23:00:00'),
        author: 'Vladislav Zinchuk',
        content: 'President Donald Trump has signed a new executive order placing a 90-day ban on people from six mainly Muslim nations.',
        tags: ["politics", "Russia"]
    },
    {
        id: ++idNews,
        title: "IBM's online quantum machine gets faster",
        summary: 'Tricky problem',
        createdAt: new Date('2017-03-27T05:14:33'),
        author: 'Vasia Baranov ',
        content: 'IBM has made its quantum computing system commercially available to businesses and beefed up an existing system used by the research community.',
        tags: ["cars", "hi-tech"]
    },
    {
        id: ++idNews,
        title: 'Gilmore Girls: The case for and against another return',
        summary: 'Gilmore Girls could be returning to our screens. Again.',
        createdAt: new Date('2012-04-27T23:00:00'),
        author: 'Maria Lopova',
        content: 'The show originally ran from 2000 to 2007 but Netflix revived it last year for four feature-length specials.',
        tags: ["fashion"]
    },
    {
        id: ++idNews,
        title: "Google's fake news Snippets",
        summary: 'Algorithms that sometimes struggle',
        createdAt: new Date('2017-05-28T22:11:40'),
        author: 'Pavel Rykov',
        content: 'It will now face increasing pressure to introduce more human oversight of algorithms that sometimes struggle to differentiate between facts and fake news.',
        tags: ["BOOM", "Russia", "IT"]
    },
    {
        id: ++idNews,
        title: 'Prize for cracking brain feel good system',
        summary: "The UK based winners cracked the brain's reward centre",
        createdAt: new Date('2017-05-28T14:54:43'),
        author: 'James Gallagher',
        content: "Three UK-based scientists have won a prestigious prize worth 1m euros for studying the brain's reward centre.",
        tags: ["hi-tech", "sport"]
    }
];

function getArticles(skip, top, filterConfig) {
    if (skip == undefined)
        skip = 0;
    if (skip > idNews)
        return 0;
    if (top > idNews)
        top = idNews;
    var newArticals = [];
    var countOfArticals = 0;
    if (filterConfig == undefined) {
        for (var i = skip; i < top + skip && i < idNews; i++) {
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
    if (filterConfig.tags != undefined) {
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

function showArticles(skip, top, filterConfig) {
    var newArticles = getArticles(skip, top, filterConfig);
    newArticles[idNews++] = ( getArticle("1"));
    newArticles[idNews++] = ( getArticle("3"));
    addArticle({
        id: 6,
        title: "Arsenal lose",
        summary: " Bayern humiliate Arsenal 10-2 on aggregate after Koscielny sees red",
        createdAt: new Date('2017-03-08T00:01:34'),
        author: "Paul Hassall",
        content: "Bayern humiliate Arsenal 10-2 on aggregate after Koscielny sees red",
        tags: ["sport"]
    })
    editArticle(4, {
        id: 7,
        title: "Change news",
        summary: "This news were changed",
        createdAt: new Date('2017-03-07T23:40:52'),
        author: "Le Buzz",
        content: "This news were changed,method is work",
        tags: ["car", "hi-tech"]
    })
    ///removeArticle(2);
    addTag(3, "sport");
    deleteTag(1, "Russia");
    newArticles.forEach(function (item, i, newArticles) {
        console.log(item.id + ' ' + item.author + ' ' + item.title + ' ' + item.summary + ' ' + item.tags);
    });
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
        && (article.tags && article.tags.length > 0)) {
        return true;
    }
    else
        return false;
}

function addArticle(article) {
    if (validateArticle(article)) {
        articles[idNews++] = article;
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

