function jquery_usestric() {
    'use strict';
    var x = '999';
    var y = eval(" y = 8 ;");
    var z = x + y + 10000;
    document.getElementById('use-strict').innerHTML = z;
    return z;
}

function vanilla_usestric() {
    var x = '999';
    y = eval(" y = 8 ;");
    z = x + y + 10000;
    document.getElementById('no-strict').innerHTML = z;
    return z;
}

function xpath_usestric() {
    'use strict';
    return null;
}

// ------------------------------------------- //

function jquery_textNode() {
    'use strict';
    var result = $('#nbOfIteration').text();
    return result;
}

function vanilla_textNode() {
    'use strict';
    var result = document.getElementById("nbOfIteration").childNodes[0].nodeValue;
    return result;
}

function xpath_textNode() {
    'use strict';
    return null;
}

// ------------------------------------------- //

function jquery_h1() {
    'use strict';
    var result = $('h1')[0].innerText;
    return result;
}

function vanilla_h1() {
    'use strict';
    var result = document.getElementsByTagName("h1")[0].childNodes[0].nodeValue;
    return result;
}

function xpath_h1() {
    'use strict';
    var xpathResult = document.evaluate('//h1[1]', document, null, XPathResult.ANY_TYPE, null);
    var result = xpathResult.iterateNext().innerText;
    return result;
}

// ------------------------------------------- //

function jquery_count_a() {
    'use strict';
    var result = $("a[href]").length;
    return result;
}

function vanilla_count_a() {
    'use strict';
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
    'use strict';
    var result = $('#title').offset().top + ', ' + $('#title').offset().left;
    return result;
}

function vanilla_offset() {
    'use strict';
    function offset(elt) {
        var rect = elt.getBoundingClientRect(), bodyElt = document.body;

        return {
          top: rect.top + bodyElt .scrollTop,
          left: rect.left + bodyElt .scrollLeft
        };
    }
    var offsetElt = offset(document.getElementById('title'));
    return offsetElt.top + ', ' + offsetElt.left;
}

function xpath_output() {
    'use strict';
    return null;
}

// ------------------------------------------- //

function jquery_each() {
    'use strict';
    var result = "";
    $('#each-table td').each(function(index, el) {
        result += index + ", " + $(el).text();
    });
    return result;
}

function vanilla_each() {
    'use strict';
    var result = "";
    var td_list = document.getElementById("each-table").getElementsByTagName("td");
    for(var i = 0, len = td_list.length; i < len; i++) {
        result += i + ", " + td_list[i].childNodes[0].nodeValue;
    }
    return result;
}

function xpath_each() {
    'use strict';
    return null;
}

// ------------------------------------------- //
// ------------------------------------------- //

function inner_func(method) {
    var result = method.toString();
    result = result.substr(result.indexOf('\n') + 1);
    result = result.substr(result.indexOf('\n') + 1, result.lastIndexOf('\n') - 3);
    result = result.substr(0, result.lastIndexOf('\n') -1);
    return js_beautify(
        "\n\n" + result.substr(0, result.lastIndexOf('\n'))
    );
}

function addEditor(id) {
    "use strict";
    var editor = ace.edit(id);
    editor.setTheme("ace/theme/chrome");
    editor.setOptions({
        mode: "ace/mode/javascript",
        maxLines: 50,
        readOnly: true,
        autoScrollEditorIntoView: true
    });
}

function show_code(element, destination, jquery_method, vanilla_method, xpath_method, vanilla_result, xpath_result) {
    'use strict';
    if($(element).is(':checked')) {
        $("#codeJQuery-" + destination
            +", #codeVanilla-" + destination
            +", #codeXPath-" + destination
        ).removeClass("hidden");
        if (!$(element).data("hasShowDetail")) {
            $("#codeJQuery-" + destination + " > code").html(
                inner_func(window[jquery_method])
            );
            if (vanilla_result != "null") {
                $("#codeVanilla-" + destination + " > code").html(
                    inner_func(window[vanilla_method])
                );
            }
            if (xpath_result != "null") {
                $("#codeXPath-" + destination + " > code").html(
                    inner_func(window[xpath_method])
                );
            }
            addEditor("codeJQuery-" + destination);
            addEditor("codeVanilla-" + destination);
            addEditor("codeXPath-" + destination);
            $(element).data("hasShowDetail", true);
        }
        if (vanilla_result === "null" || xpath_result === "null") {
            if (vanilla_result === "null") {
                $("#codeVanilla-" + destination).addClass("hidden");
            }
            if (xpath_result === "null") {
                $("#codeXPath-" + destination).addClass("hidden");
            }
        }
    }
    else {
        $("#codeJQuery-" + destination
            +", #codeVanilla-" + destination
            +", #codeXPath-" + destination
        ).addClass("hidden");
    }
}

function format_bench_result(jquery_o, bench_o) {
    "use strict";
    if (bench_o.result === null) {
        return "";
    }
    var text = "plus rapide";
    var compare_t = parseInt(jquery_o.time / bench_o.time);
    var css_class = "";
    if (compare_t == 0) {
        css_class = "red";
        compare_t = parseInt(bench_o.time / jquery_o.time);
        if (compare_t == 1) {
            compare_t = Number(bench_o.time / jquery_o.time).toFixed(2);
        }
        text = "plus lent";
    }
    else if (compare_t == 1) {
        compare_t = Number(jquery_o.time / bench_o.time).toFixed(2);
    }
    else if (compare_t > 10) {
        css_class = "green";
    }
    return bench_o.timeformat
        + ' => <strong class="' + css_class + '">' + compare_t
        + "x " + text + "!</strong>";
}

function display(destination, title, jquery_method, vanilla_method, xpath_method, nb_pass) {
    'use strict';
    var jquery_bench = bench(jquery_method, nb_pass, [], this);
    var vanilla_bench = bench(vanilla_method, nb_pass, [], this);
    if (document.evaluate) {
        $("#thXpath").removeClass("hidden");
        var xpath_bench = bench(xpath_method, nb_pass, [], this);
    }
    else {
        var xpath_bench = { result: nb_pass };
    }
    var tr = '<tr id="' + destination + '">'
        + '<td><input type="checkbox" '
        + "onclick=\"show_code(this, '"
            + destination + "', '"
            + jquery_method.name  + "', '"
            + vanilla_method.name  + "', '"
            + xpath_method.name  + "', '"
            + vanilla_bench.result  + "', '"
            + xpath_bench.result  + "', '"
            + "');\" /></td>"
        + '<td>' + title + '</td>'
        + '<td class="tdJQuery">'
            + '<div>'
                + jquery_bench.timeformat
            + '</div>'
            + '<pre class="highlight hidden" id="codeJQuery-' + destination +'">'
                + '<code></code>'
            + '</pre>'
        + '</td>'
        + '<td class="tdVanilla">'
            + '<div>'
                + format_bench_result(jquery_bench, vanilla_bench)
            +'</div>'
            + '<pre class="highlight hidden" id="codeVanilla-' + destination +'">'
                + '<code></code>'
            + '</pre>'
        + '</td>';

    if (document.evaluate) {
        tr += '<td class="tdXPath">'
            + '<div>'
                + format_bench_result(jquery_bench, xpath_bench)
            +'</div>'
            + '<pre class="highlight hidden" id="codeXPath-' + destination +'">'
                + '<code></code>'
            + '</pre>'
        + '</td>'
    }
    tr += '<td class="result"></td>'
    + '</tr>'
    $("#benchmark-table tbody").append(tr);
    if (
        (jquery_bench.result === vanilla_bench.result || vanilla_bench.result === null)
        || (
            vanilla_bench.result === xpath_bench.result && document.evaluate
            || xpath_bench.result === null
        )
    ) {
        $("#" + destination).find(".result").text(jquery_bench.result);
    }
    else {
        $("#" + destination).find(".result").html(
            '<strong class="text-danger">Le résultat renvoyé est différent!</strong>'
        );
    }
}

// ------------------------------------------- //

$(function() {
    'use strict';
    var number_of = 10000;
    document.getElementById("nbOfIteration").appendChild(document.createTextNode(number_of));
    //display("bench-strict", "Use strict", jquery_usestric, vanilla_usestric, xpath_usestric, number_of);
    display("bench-value", "Recherche la valeur d'un textNode", jquery_textNode, vanilla_textNode, xpath_textNode, number_of);
    display("bench-h1", "Recherche du titre h1", jquery_h1, vanilla_h1, xpath_h1, number_of);
    display("bench-a", "Compter le nombre de liens", jquery_count_a, vanilla_count_a, xpath_count_a, number_of);

    display("each", "Boucler sur les td et concatener les valeurs", jquery_each, vanilla_each, xpath_each, number_of);
    // http://www.debray-jerome.fr/js-performance-la-fonction-offset-de-jquery-vs-vanilla-javascript-23.html
    // http://jsperf.com/test-offset-jquery-vs-vanilla
    display("bench-offset", "Fonction offset", jquery_offset, vanilla_offset, xpath_output, number_of);
});