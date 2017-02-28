var slide = 1;

function changeSlide() {
    if (slide == 1) {
        document.getElementById("first-slide").src = "images/slide2.jpg";
        document.getElementById("slide-text-first").innerHTML = "Достучаться до небес";
        document.getElementById("second-slide").src = "images/slide3.jpg";
        document.getElementById("slide-text-second").innerHTML = "Край моря";
        document.getElementById("third-slide").src = "images/slide1.jpg";
        document.getElementById("slide-text-third").innerHTML = "Успокой себя";
    }
    if (slide == 2) {
        document.getElementById("first-slide").src = "images/manhattan-407703_1920.jpg"
        document.getElementById("slide-text-first").innerHTML = "Жизнь большого города";
        document.getElementById("second-slide").src = "images/slide2.jpg";
        document.getElementById("slide-text-second").innerHTML = "Быстрый поток";
        document.getElementById("third-slide").src = "images/slide6.jpg";
        document.getElementById("slide-text-third").innerHTML = "Ночная дорога";
    }
    slide++;
    if (slide > 2) {
        slide = 1;
    }
    setTimeout(changeSlide, 5000);
}