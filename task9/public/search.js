function search() {
    let string = document.getElementById("searchString").value;
    let articles = articleModel.getArticles(0,articleModel.getLength());
    let newArticles= [] ;
    let countOfArticals = 0;
    for(let i = 0 ; i < articleModel.getLength(); i++ ) {
        if (articles[i].title.indexOf(string) > -1) {
            newArticles[countOfArticals] = articles[i];
            countOfArticals++;
            continue;
        }
        if (articles[i].summary.indexOf(string) > -1) {
            newArticles[countOfArticals] = articles[i];
            countOfArticals++;
            continue;
        }
        if (articles[i].author.indexOf(string) > -1) {
            newArticles[countOfArticals] = articles[i];
            countOfArticals++;
            continue;
        }
        if (articles[i].content.indexOf(string) > -1) {
            newArticles[countOfArticals] = articles[i];
            countOfArticals++;
        }
        for (let j = 0; j < articles[i].tags.length; j++) {
            if (articles[i].tags[j].indexOf(string) > -1) {
                newArticles[countOfArticals] = articles[i];
                countOfArticals++;
                break;
        }
    }

    }
    if(countOfArticals == 0) {
        alert("Новости не найдены!");
        return 0;
    }
    articleRenderer.removeArticlesFromDom();
    articleRenderer.insertArticlesInDOM(newArticles);
    document.querySelector(".pagination-button").style.visibility = "hidden";
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
}

function cl(e) {
    e = e || window.event;
    if (e.keyCode === 13)
    {
        document.getElementById("btn").click();
        search();
    }
    return false;
}
