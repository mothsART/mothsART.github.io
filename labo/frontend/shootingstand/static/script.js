function giveLetter(p) {
    return p.charAt(Math.floor(Math.random() * p.length));
}

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var inc = 0;
var standElement = document.getElementById('stand');
while (possible.length !== 0) {
    letter = giveLetter(possible);
    possible = possible.replace(letter, '');
    var letter_container = document.createElement('div');
    letter_container.classList.add('container');
    letter_container.classList.add('c' + inc);
    var letterElement = document.createElement('div');
    letterElement.classList.add('letter');
    letterElement.appendChild(document.createTextNode(letter));
    letter_container.appendChild(letterElement);
    standElement.appendChild(letter_container);
    inc++;
}

function zoom(_in) {
    if (_in) {
        document.body.classList.add('zoom');
    } else {
        document.body.classList.remove('zoom');
    }
}