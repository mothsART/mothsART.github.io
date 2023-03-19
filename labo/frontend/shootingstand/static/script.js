var NS            = "http://www.w3.org/2000/svg";
var possible      = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var inc           = 0;
var standElement  = document.getElementById('stand');
var chooseLetters = [];

function showPress(evt) {
    if (evt.key === 'Enter') {
        zoom(true);
    }
    console.error(evt.key);
    var stroke = window.getComputedStyle(chooseLetters[10]).stroke;
    console.error(chooseLetters[10]);
    console.error(stroke);
}

function giveLetter(p) {
    return p.charAt(Math.floor(Math.random() * p.length));
}

function zoom(_in) {
    if (_in) {
        document.body.classList.add('zoom');
    } else {
        document.body.classList.remove('zoom');
    }
}

while (possible.length !== 6) {
    letter = giveLetter(possible);
    possible = possible.replace(letter, '');
    var letter_container = document.createElementNS(NS, 'g');
    letter_container.classList.add('c' + inc);
    letter_container.classList.add('container');
    var rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('height', '100');
    rect.setAttribute('width', '100');
    rect.setAttribute('rx', '20');
    rect.setAttribute('ry', '20');
    var letter_element = document.createElementNS(NS, "text");
    letter_element.classList.add('letter');
    letter_element.setAttribute('height', '100');
    letter_element.setAttribute('width', '100');
    letter_element.setAttribute('x', '5');
    letter_element.setAttribute('y', '17');
    letter_element.append(document.createTextNode(letter));
    chooseLetters.push(letter_container);
    letter_container.appendChild(rect);
        letter_container.appendChild(letter_element);
    standElement.appendChild(letter_container);
    inc++;
}

document.onkeypress = showPress;
