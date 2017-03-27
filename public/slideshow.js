var slide = 1;

function getNameItem(num) {
    var items = articleModel.getArticles(0,6);
    return items[num].title;
}
function getNameImage(num){
    var items = articleModel.getArticles(0,6);
    return items[num].img;
}

function getIdItem(num) {
    var items = articleModel.getArticles(0,6);
    return items[num].id;
}

function changeSlide() {
    var tem = JSON.parse(localStorage.getItem("newArticals"));
    if(tem) {
        articleModel.stringToDate(tem);
        articleModel.reWrite(tem);
    }
    if (slide == 1) {
        document.getElementById("first-slide").src =  getNameImage(0);
        document.getElementById("slide-text-first").innerHTML = getNameItem(0);
        document.getElementById("slideItem1").setAttribute("slideItem1",getIdItem(0));
        document.getElementById("second-slide").src =  getNameImage(1);
        document.getElementById("slide-text-second").innerHTML = getNameItem(1);
        document.getElementById("slideItem2").setAttribute("slideItem2",getIdItem(1));
        document.getElementById("third-slide").src =  getNameImage(2);
        document.getElementById("slide-text-third").innerHTML = getNameItem(2);
        document.getElementById("slideItem3").setAttribute("slideItem3",getIdItem(2));

    }
    if (slide == 2) {
        document.getElementById("first-slide").src = getNameImage(3);
        document.getElementById("slide-text-first").innerHTML = getNameItem(3);
        document.getElementById("slideItem1").setAttribute("slideItem3",getIdItem(3));
        document.getElementById("second-slide").src = getNameImage(4);
        document.getElementById("slide-text-second").innerHTML = getNameItem(4);
        document.getElementById("slideItem2").setAttribute("slideItem2",getIdItem(4));
        document.getElementById("third-slide").src = getNameImage(5);
        document.getElementById("slide-text-third").innerHTML = getNameItem(5);
        document.getElementById("slideItem3").setAttribute("slideItem3",getIdItem(5));
    }
    slide++;
    if (slide > 2) {
        slide = 1;
    }
    setTimeout(changeSlide, 3000);
}
