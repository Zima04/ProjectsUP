'use strict';

let slide = 1;


function getNameItem(num) {
    return dbModel.getArrayOfArticals(0, 6).then((items) => {
        return items[num].title;
    });
}

function getNameImage(num) {
    return dbModel.getArrayOfArticals(0, 6).then((items) => {
        return items[num].img;
    });
}

function getIdItem(num) {
    return dbModel.getArrayOfArticals(0, 6).then((items) => {
        return items[num]._id;
    });
}

function changeSlide() {
    articleModel.replaceArticles().then(
        () => {
            if (slide === 1) {
                getNameItem(0).then((title) => {
                    document.getElementById('slide-text-first').innerHTML = title;
                });
                getNameImage(0).then((img) => {
                    document.getElementById('first-slide').src = img;
                });
                getIdItem(0).then((id) => {
                    document.getElementById('slideItem1').setAttribute('slideItem1', id);
                });
                getNameItem(1).then((title) => {
                    document.getElementById('slide-text-second').innerHTML = title;
                });
                getNameImage(1).then((img) => {
                    document.getElementById('second-slide').src = img;
                });
                getIdItem(1).then((id) => {
                    document.getElementById('slideItem2').setAttribute('slideItem2', id);
                });
                getNameItem(2).then((title) => {
                    document.getElementById('slide-text-third').innerHTML = title;
                });
                getNameImage(2).then((img) => {
                    document.getElementById('third-slide').src = img;
                });
                getIdItem(2).then((id) => {
                    document.getElementById('slideItem3').setAttribute('slideItem3', id);
                });
            }
            if (slide === 2) {
                getNameItem(1).then((title) => {
                    document.getElementById('slide-text-first').innerHTML = title;
                });
                getNameImage(1).then((img) => {
                    document.getElementById('first-slide').src = img;
                });
                getIdItem(1).then((id) => {
                    document.getElementById('slideItem1').setAttribute('slideItem1', id);
                });
                getNameItem(2).then((title) => {
                    document.getElementById('slide-text-second').innerHTML = title;
                });
                getNameImage(2).then((img) => {
                    document.getElementById('second-slide').src = img;
                });
                getIdItem(2).then((id) => {
                    document.getElementById('slideItem2').setAttribute('slideItem2', id);
                });
                getNameItem(3).then((title) => {
                    document.getElementById('slide-text-third').innerHTML = title;
                });
                getNameImage(3).then((img) => {
                    document.getElementById('third-slide').src = img;
                });
                getIdItem(3).then((id) => {
                    document.getElementById('slideItem3').setAttribute('slideItem3', id);
                });
            }
            if (slide === 3) {
                getNameItem(2).then((title) => {
                    document.getElementById('slide-text-first').innerHTML = title;
                });
                getNameImage(2).then((img) => {
                    document.getElementById('first-slide').src = img;
                });
                getIdItem(2).then((id) => {
                    document.getElementById('slideItem1').setAttribute('slideItem1', id);
                });
                getNameItem(3).then((title) => {
                    document.getElementById('slide-text-second').innerHTML = title;
                });
                getNameImage(3).then((img) => {
                    document.getElementById('second-slide').src = img;
                });
                getIdItem(3).then((id) => {
                    document.getElementById('slideItem2').setAttribute('slideItem2', id);
                });
                getNameItem(4).then((title) => {
                    document.getElementById('slide-text-third').innerHTML = title;
                });
                getNameImage(4).then((img) => {
                    document.getElementById('third-slide').src = img;
                });
                getIdItem(4).then((id) => {
                    document.getElementById('slideItem3').setAttribute('slideItem3', id);
                });
            }
            if (slide === 4) {
                getNameItem(3).then((title) => {
                    document.getElementById('slide-text-first').innerHTML = title;
                });
                getNameImage(3).then((img) => {
                    document.getElementById('first-slide').src = img;
                });
                getIdItem(3).then((id) => {
                    document.getElementById('slideItem1').setAttribute('slideItem1', id);
                });
                getNameItem(4).then((title) => {
                    document.getElementById('slide-text-second').innerHTML = title;
                });
                getNameImage(4).then((img) => {
                    document.getElementById('second-slide').src = img;
                });
                getIdItem(4).then((id) => {
                    document.getElementById('slideItem2').setAttribute('slideItem2', id);
                });
                getNameItem(5).then((title) => {
                    document.getElementById('slide-text-third').innerHTML = title;
                });
                getNameImage(5).then((img) => {
                    document.getElementById('third-slide').src = img;
                });
                getIdItem(5).then((id) => {
                    document.getElementById('slideItem3').setAttribute('slideItem3', id);
                });
            }
            if (slide === 5) {
                getNameItem(4).then((title) => {
                    document.getElementById('slide-text-first').innerHTML = title;
                });
                getNameImage(4).then((img) => {
                    document.getElementById('first-slide').src = img;
                });
                getIdItem(4).then((id) => {
                    document.getElementById('slideItem1').setAttribute('slideItem1', id);
                });
                getNameItem(5).then((title) => {
                    document.getElementById('slide-text-second').innerHTML = title;
                });
                getNameImage(5).then((img) => {
                    document.getElementById('second-slide').src = img;
                });
                getIdItem(5).then((id) => {
                    document.getElementById('slideItem2').setAttribute('slideItem2', id);
                });
                getNameItem(0).then((title) => {
                    document.getElementById('slide-text-third').innerHTML = title;
                });
                getNameImage(0).then((img) => {
                    document.getElementById('third-slide').src = img;
                });
                getIdItem(0).then((id) => {
                    document.getElementById('slideItem3').setAttribute('slideItem3', id);
                });
            }
            if (slide === 6) {
                getNameItem(5).then((title) => {
                    document.getElementById('slide-text-first').innerHTML = title;
                });
                getNameImage(5).then((img) => {
                    document.getElementById('first-slide').src = img;
                });
                getIdItem(5).then((id) => {
                    document.getElementById('slideItem1').setAttribute('slideItem1', id);
                });
                getNameItem(0).then((title) => {
                    document.getElementById('slide-text-second').innerHTML = title;
                });
                getNameImage(0).then((img) => {
                    document.getElementById('second-slide').src = img;
                });
                getIdItem(0).then((id) => {
                    document.getElementById('slideItem2').setAttribute('slideItem2', id);
                });
                getNameItem(1).then((title) => {
                    document.getElementById('slide-text-third').innerHTML = title;
                });
                getNameImage(1).then((img) => {
                    document.getElementById('third-slide').src = img;
                });
                getIdItem(1).then((id) => {
                    document.getElementById('slideItem3').setAttribute('slideItem3', id);
                });
                document.getElementById('first-slide').src = getNameImage(5);
                document.getElementById('slide-text-first').innerHTML = getNameItem(5);
                document.getElementById('slideItem1').setAttribute('slideItem3', getIdItem(5));
                document.getElementById('second-slide').src = getNameImage(0);
                document.getElementById('slide-text-second').innerHTML = getNameItem(0);
                document.getElementById('slideItem2').setAttribute('slideItem2', getIdItem(0));
                document.getElementById('third-slide').src = getNameImage(1);
                document.getElementById('slide-text-third').innerHTML = getNameItem(1);
                document.getElementById('slideItem3').setAttribute('slideItem3', getIdItem(1));
            }
            slide += 1;
            if (slide > 6) {
                slide = 1;
            }
            setTimeout(changeSlide, 3000);
        });
}
