function jquery_h1() {
    'use strict';
    var result = $('h1')[0].innerText;
    return result;
}

function vanilla_h1() {
    'use strict';
    var result = document.getElementsByTagName("h1")[0].innerText;
    return result;
}

function xpath_h1() {
    'use strict';
    var xpathResult = document.evaluate('//h1[1]', document, null, XPathResult.ANY_TYPE, null);
    var result = xpathResult.iterateNext().innerText;
    return result;
}

// ------------------------------------------- //

function jquery_count_a () {
    'use strict';
    var result = $("a[href]").length;
    return result;
}

function vanilla_count_a() {
    'use strict';
    // var count = 0;
    // function number_of_a_with_href(element, index, ar) {
    //     if (element.hasAttribute("href")) {
    //         count += 1;
    //     }
    // }
    // var all_a = document.getElementsByTagName("a");
    // Array.prototype.forEach.call(all_a, number_of_a_with_href);

    // return count;

    var result = document.querySelectorAll("a[href]").length;
    return result;
}

function xpath_count_a() {
    'use strict';
    var linkCount = document.evaluate(
        "count(//a[@href])", document, null, XPathResult.NUMBER_TYPE, null
    ).numberValue;
    return linkCount;
}

// ------------------------------------------- //

function jquery_offset() {
    return $('#title').offset().top + ', ' + $('#title').offset().left;
}

function vanilla_offset() {
    function offset(elt) {
        var rect = elt.getBoundingClientRect(), bodyElt = document.body;

        return {
          top: rect.top + bodyElt .scrollTop,
          left: rect.left + bodyElt .scrollLeft
        }
    }
    var offsetElt = offset(document.getElementById('title'));
    return offsetElt.top + ', ' + offsetElt.left;
}

function xpath_output() {
    return "";
}

function display(destination, title, jquery_method, vanilla_method, xpath_method, nb_pass) {
    'use strict';
    $("#benchmark-table tbody").append(
        '<tr id="' + destination + '">'
            + '<td>' + title + '</td>'
            + '<td></td>'
            + '<td></td>'
            + '<td></td>'
            + '<td></td>'
        + '</tr>'
    );

    var jquery_bench = bench(jquery_method, nb_pass, [], this);
    $($("#" + destination).find("td")[1]).html(jquery_bench.time);

    var vanilla_bench = bench(vanilla_method, nb_pass, [], this);
    $($("#" + destination).find("td")[2]).html(vanilla_bench.time);

    var xpath_bench = bench(xpath_method, nb_pass, [], this);
    $($("#" + destination).find("td")[3]).html(xpath_bench.time);

    if (
        jquery_bench.result == vanilla_bench.result
        && vanilla_bench.result == xpath_bench.result
    ) {
        $($("#" + destination).find("td")[4]).text(jquery_bench.result);
    }
    else {
        $($("#" + destination).find("td")[4]).html(
            '<strong class="text-danger">Pas le même résultat renvoyé!</strong>'
        );
    }
}

$(function() {
    'use strict';
    display("bench-h1", "Recherche du titre h1", jquery_h1, vanilla_h1, xpath_h1, 10000);

    display("bench-a", "Compter le nombre de liens", jquery_count_a, vanilla_count_a, xpath_count_a, 10000);

    // http://www.debray-jerome.fr/js-performance-la-fonction-offset-de-jquery-vs-vanilla-javascript-23.html
    // http://jsperf.com/test-offset-jquery-vs-vanilla
    display("bench-offset", "Fonction offset", jquery_offset, vanilla_offset, xpath_output, 10000);
});