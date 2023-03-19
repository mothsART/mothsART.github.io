// http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
// Jsfiddle of solution without user-agent : https://jsfiddle.net/9atsffau/

function giveBrowserWithoutUserAgent() {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    var browser = undefined;
    var browserVersion = undefined;

    if (isOpera) {
        browser = "Opéra";
        if (isBlink) {
            browserVersion = ">= 15";
        }
    }
    if (isFirefox) {
        browser = "Firefox";
    }
    if (isSafari) {
        browser = "Safari";
    }
    if (isIE) {
        browser = "Internet Explorer";
    }
    if (isEdge) {
        browser = "Edge";
    }
    if (isChrome) {
        browser = "Chrome";
        if (isBlink) {
            browserVersion = ">= 28";
        }
    }

    return { name: browser, version: browserVersion }
}

function giveBrowserWithUserAgent() {
    var browser = undefined;
    var browserVersion = undefined;

    if (is.opera()) {
        browser = "Opéra";
    }
    if (is.firefox()) {
        browser = "Firefox";
    }
    if (is.safari()) {
        browser = "Firefox";
    }
    if (is.ie()) {
        browser = "Internet Explorer";
    }
    if (is.edge()) {
        browser = "Edge";
    }
    if (is.chrome()) {
        browser = "Chrome";
    }

    return { name: browser, version: browserVersion }
}