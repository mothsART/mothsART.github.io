$(function() {
    'use strict';
    var isTested = false;
    $('#modal-modernizr').on('shown.bs.modal', function () {
        if (isTested === true)
            return;

        // Browser Detection (without user-agent)
        var browserWithoutUserAgent = giveBrowserWithoutUserAgent();

        if (browserWithoutUserAgent.name) {
            $("#browser-summary-without-user-agent").append(
                "<label>Navigateur</label><span> "
                + browserWithoutUserAgent.name + "</span> "
            );
            if (browserWithoutUserAgent.version) {
                $("#browser-summary-without-user-agent").append(
                    "<label>Navigateur</label><span> "
                    + browserWithoutUserAgent.version + "</span>"
                );
            }
        }

        // Browser Detection (with user-agent)
        var sumarry_with_user_agent = "";
        var browserWithUserAgent = giveBrowserWithUserAgent();
        sumarry_with_user_agent = "<label>Navigateur</label><span> "
            + browserWithUserAgent.name + "</span> "
            + "<label>Interface tactile</label>";
        if (is.touchDevice()) {
            sumarry_with_user_agent += "<span> oui</span>";
        }
        else {
            sumarry_with_user_agent += "<span> non</span>";
        }
        $("#browser-summary-with-user-agent div").append(sumarry_with_user_agent);

        var hasFlashPlugin = false;
        var flashPluginPrecision = PluginDetect.getVersion("flash");
        if (flashPluginPrecision != null) {
            hasFlashPlugin = true;
        }
        var hasJavaPlugin = false;
        var javaPluginPrecision = PluginDetect.getVersion("Java", 'getJavaInfo.jar');
        if (javaPluginPrecision != null) {
            hasJavaPlugin = true;
        }
        var modernizrTests = [
            { title: "Cookies", rule: navigator.cookieEnabled },
            { title: "Plugin Flash", rule: hasFlashPlugin, precision: flashPluginPrecision },
            { title: "Plugin Java", rule: hasJavaPlugin, precision: javaPluginPrecision },
            { title: "Css @keyframes", rule: Modernizr.atRule('@keyframes') },
            { title: "Websocket's support", rule: Modernizr.websockets }
        ];

        var nbOfTests = modernizrTests.length;
        var nbOfTestsPassed = 0;

        $.each(modernizrTests, function(index, value) {
            if (!value.precision) {
                value.precision = '';
            }
            $("#features-supported tbody").append(
                '<tr id="features-supported-' + index + '">'
                    + '<td>' + parseInt(index + 1) + '</td>'
                    + '<td>' + value.title + '</td>'
                    + '<td><span class="glyphicon" aria-hidden="true"></span></td>'
                    + '<td>' + value.precision + '</td>'
                + '</tr>'
            );
            if (value.rule) {
                $($('#features-supported-' + index + ' td')[2])
                .find('span').addClass("glyphicon-ok").addClass("text-success");
                nbOfTestsPassed += 1;
            }
            else {
                $($('#features-supported-' + index + ' td')[2])
                .find('span').addClass("glyphicon-remove").addClass("text-danger");
            }
        });

        var percentage = parseInt(100 * nbOfTestsPassed / nbOfTests);
        var summary = nbOfTestsPassed + " / " + nbOfTests + " (" + percentage + " %)";
        if (percentage === 100) {
            $("#features-summary").html(
                '<span class="text-success">Tous les tests sont concluants : <strong>'
                + summary + '</strong></span>'
            );
        }
        else {
            $("#features-summary").html(
                '<span class="text-danger">Tous les tests ne sont pas passés : '
                + summary + '</strong></span>'
            );
        }
        isTested = true;
        // if (keyframesTest) {
        //     console.log("paf");
        //    // keyframes are supported
        //    // could be `@-webkit-keyframes` or `@keyframes`
        // } else {
        //    // keyframes === `false`
        // }
    })
});