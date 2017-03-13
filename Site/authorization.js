var username = null;
function authorization() {
    username = "Alexey";
}
function logIn() {
    if(username) {
        document.getElementById("username").innerHTML = "Holla," + username + "!";
        document.querySelector(".add-news-button").style.visibility = "visible";
        document.querySelector('.header-icon-man').setAttribute("src","images/bender.png");
    }
}