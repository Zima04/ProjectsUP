function getItem(elem){
    document.querySelector(".main-page").style.display = "none";
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector(".edit-news").style.display = "inline-block";
    let article = articleModel.getArticle(elem.dataset.id);
    document.blockChangeItem.setAttribute('get-id', article.id) ;
    document.getElementById('get-name').value = article.title;
    document.getElementById('get-message').value = article.summary;
   // document.getElementById('get-picture').setAttribute("src", article.img);
    let newTags = "";
    for (let i = 0; i < article.tags.length; i++) {
        newTags += article.tags[i] + " ";
    }
    document.getElementById('get-tags').value = newTags;
}

function getItemFromFull(elem){
    document.querySelector(".main-page").style.display = "none";
    document.querySelector('.full-news').style.display = 'none';
    document.querySelector(".edit-news").style.display = "inline-block";
    let article = articleModel.getArticle(elem.id);
    document.blockChangeItem.setAttribute('get-id', article.id) ;
    document.getElementById('get-name').value = article.title;
    document.getElementById('get-message').value = article.summary;
    let newTags = "";
    for (let i = 0; i < article.tags.length; i++) {
        newTags += "#" + article.tags[i] + " ";
    }
    document.getElementById('get-tags').value = newTags;
}

function changeFields(inputId) {
    let head = document.blockChangeItem.head.value;
    let message = document.blockChangeItem.message.value;
    let tags = document.blockChangeItem.tags.value;
    let image = document.blockChangeItem.image.value;
    let newTags = tags.split(' ');
    let authorName = localStorage.getItem("username");
    dbModel.editArtical({
        author: authorName,
        id: inputId,
        title: head,
        summary: message,
        createdAt: new Date(),
        content: message,
        img: image,
        tags : newTags
    });
    alert("Новость редактирована!");
    document.querySelector(".main-page").style.display = "inline-block";
    document.querySelector(".edit-news").style.display = "none";
    document.querySelector(".full-news").style.display = "none";
    document.querySelector(".block-add-news").style.display = "none";
    document.querySelector(".in").style.display = "none";
    startApp();
    addUserUI();
}