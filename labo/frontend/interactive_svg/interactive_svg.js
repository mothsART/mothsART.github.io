

var zoomGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
zoomGroup.setAttribute('id', 'zoom-controls');

// Finally append created element
$("svg").appendChild(zoomGroup);

/*function resize_svg() {
    "using strict";
    var nav_height = $($("nav")[0]).height();
    $(".interactive_element").css("height", $(window).height() - nav_height -4);
    $(".interactive_element").css("marginTop", nav_height);
    var width = $(".interactive_element").width();
    $(".interactive_element").css("marginLeft", $(window).width()/2 - width/2);
}

window.onload = function() {
    "using strict";
    resize_svg();
};

$(window).resize(function() {
    "using strict";
    resize_svg();
});*/