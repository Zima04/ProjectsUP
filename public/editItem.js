function getItem(elem){
    document.querySelector(".main-page").style.display = "none";
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector(".edit-news").style.display = "inline-block";
    var article = articleModel.getArticle(elem.dataset.id);
    document.blockChangeItem.setAttribute('get-id', article.id) ;
    document.getElementById('get-name').value = article.title;
    document.getElementById('get-message').value = article.summary;
   // document.getElementById('get-picture').setAttribute("src", article.img);
    var newTags = "";
    for (var i = 0; i < article.tags.length; i++) {
        newTags += article.tags[i] + " ";
    }
    document.getElementById('get-tags').value = newTags;
}

function getItemFromFull(elem){
    document.querySelector(".main-page").style.display = "none";
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector(".edit-news").style.display = "inline-block";
    var article = articleModel.getArticle(elem.id);
    document.blockChangeItem.setAttribute('get-id', article.id) ;
    document.getElementById('get-name').value = article.title;
    document.getElementById('get-message').value = article.summary;
    // document.getElementById('get-picture').setAttribute("src", article.img);
    var newTags = "";
    for (var i = 0; i < article.tags.length; i++) {
        newTags += "#" + article.tags[i] + " ";
    }
    document.getElementById('get-tags').value = newTags;
}

function changeFields(id) {
    var head = document.blockChangeItem.head.value;
    var message = document.blockChangeItem.message.value;
    var tags = document.blockChangeItem.tags.value;
    var newTags = tags.split(' ');
    articleModel.editArticle(id,{
        title: head,
        summary: message,
        createdAt: new Date(),
        content: message,
        tags : newTags
    });
    var newArticles = articleModel.getArticles(0,articleModel.getLenth());
    localStorage.setItem("newArticals",JSON.stringify(newArticles));
    alert("Новость редактирована!");
}