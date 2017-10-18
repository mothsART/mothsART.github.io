function select_theme(element) {
    "use strict";
    var themes = document.getElementsByTagName("article");
    for (var i = 0, len = themes.length; i < len; i++) {
        themes[i].style.transform = "";
    }
    element.parentNode.style.transform = "scale(2)";
}