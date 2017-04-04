
function showAddPage() {
    document.querySelector(".main-page").style.display = "none";
    document.querySelector(".block-add-news").style.display = "inline-block";
}

function addItem() {
    var newId = 0;
    while(articleModel.isArticle(newId) != -1)
    {
         newId = randomId(0,100);
    }
    var head = document.blockAddItem.head.value;
    var message = document.blockAddItem.message.value;
    var tags = document.blockAddItem.tags.value;
    var image = document.blockAddItem.image.value;
    var newTags = tags.split(' ');
    var authorName = localStorage.getItem("username");
    dbModel.addArtical({
        id: newId,
        title: head,
        summary: message,
        createdAt: new Date(),
        author: authorName,
        content: message,
        img: image,
        tags : newTags
    });
    var newArticles = articleModel.getArticles(0,articleModel.getLenth());
    alert("Новость добавлена в ленту!");
}
    function randomId(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

function delMemory() {
    localStorage.removeItem("newArticals");
    window.location = "index.html";
    return true;
}

