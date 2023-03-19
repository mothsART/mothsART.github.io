let sounds = [
    new Audio('./data/music-harp.mp3'),
    new Audio('./data/percussion.wav'),
    new Audio('./data/meow.wav'),
    new Audio('./data/baby-goat.mp3'),
    new Audio('./data/chicken.mp3'),
    new Audio('./data/rain.mp3'),
    new Audio('./data/trance.wav'),
];

function activate_sound(element) {
    let indice = parseInt(element.parentNode.parentNode.id.replace('player-', ''));
    let audio = sounds[indice];
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    audio.loop = true;
};

function change_sound(element) {
    let indice = parseInt(element.parentNode.id.replace('player-', ''));
    let audio = sounds[indice];
    audio.volume = element.value;
}
