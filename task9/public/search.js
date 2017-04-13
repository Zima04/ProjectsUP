function search() {
    var string = document.getElementById("searchString").value;
    var articals = articleModel.getArticles(0,articleModel.getLenth());
    var newArticals= [] ;
    var countOfArticals = 0;
    for(var i = 0 ; i < articleModel.getLenth(); i++ ) {
        if (articals[i].title.indexOf(string) > -1) {
            newArticals[countOfArticals] = articals[i];
            countOfArticals++;
            continue;
        }
        if (articals[i].summary.indexOf(string) > -1) {
            newArticals[countOfArticals] = articals[i];
            countOfArticals++;
            continue;
        }
        if (articals[i].author.indexOf(string) > -1) {
            newArticals[countOfArticals] = articals[i];
            countOfArticals++;
            continue;
        }
        if (articals[i].content.indexOf(string) > -1) {
            newArticals[countOfArticals] = articals[i];
            countOfArticals++;
        }
        for (var j = 0; j < articals[i].tags.length; j++) {
            if (articals[i].tags[j].indexOf(string) > -1) {
                newArticals[countOfArticals] = articals[i];
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
    articleRenderer.insertArticlesInDOM(newArticals);
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
