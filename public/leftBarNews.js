function getInformation(){
    var tem = JSON.parse(localStorage.getItem("newArticals"));
    if(tem) {
        articleModel.stringToDate(tem);
        articleModel.reWrite(tem);
    }
    var newArticals = articleModel.getArticles(0,5);
    var adress = "Item";
    var stringId ="get-id";
    for(var j = 0 ; j < 5; j++) {
        adress = "Item" + j;
        document.getElementById(stringId+j).setAttribute(stringId + j,newArticals[j].id)
        document.getElementsByClassName(adress)[0].childNodes[1].textContent = newArticals[j].createdAt.toLocaleDateString("ru", options1);
        var newTags = "";
        for (var i = 0; i < newArticals[j].tags.length; i++) {
            newTags += "#" + newArticals[j].tags[i] + " ";
        }
        document.getElementsByClassName(adress)[0].childNodes[3].textContent = newTags;
        document.getElementsByClassName(adress)[0].childNodes[6].textContent = newArticals[j].title;
    }
}
var options1 = {
    hour: 'numeric',
    minute: 'numeric',
}

function lookItemFromBar(el) {
    var article = articleModel.getArticle(el.id);
    document.querySelector('.main-page').style.display = 'none';
    document.querySelector('.full-news').style.display = 'block';
    document.querySelector('.article-item-title').textContent = article.title;
    document.querySelector('.article-title-img').setAttribute('src', article.img);
    document.querySelector('.article-item-content').textContent = article.content;
    document.querySelector('.article-item-author').textContent = article.author;
    document.querySelector('.article-item-date').textContent = article.createdAt.toLocaleDateString("ru", options);
    if(article.tags[0])
        document.querySelector('#article-tags-first').textContent = "#" + article.tags[0];
    if(article.tags[1])
        document.querySelector('#article-tags-second').textContent = "#" + article.tags[1];
    if(article.tags[2])
        document.querySelector('#article-tags-third').textContent = "#" + article.tags[2];
    if(article.tags[3])
        document.querySelector('#article-tags-fourth').textContent = "#" + article.tags[3];
    if(article.tags[4])
        document.querySelector('#article-tags-fifth').textContent = "#" + article.tags[4];
}

var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};