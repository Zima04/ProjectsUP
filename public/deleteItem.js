function deleteItem(el) {
    var article = articleModel.getArticle(el.dataset.id);
    articleModel.removeArticle(article.id);
    var NewArticles = articleModel.getArticles(0,articleModel.getLenth());
    localStorage.setItem("newArticals",JSON.stringify(NewArticles));
    startApp();
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    alert("Новость удалена!");
}

function deleteItemFromFull(el) {
    var article = articleModel.getArticle(el.id);
    articleModel.removeArticle(article.id);
    var NewArticles = articleModel.getArticles(0,articleModel.getLenth());
    localStorage.setItem("newArticals",JSON.stringify(NewArticles));
    startApp();
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".main-page").style.display = "inline-block";
    alert("Новость удалена!");
}
