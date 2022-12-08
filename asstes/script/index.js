
'use strict';
import Score from "./Score.js";
import { onEvent, getElement, select, print } from "./utils.js";

// ----------------Data---------------------

const timer = select('.timer');
const hits = select('.hits');
const input = select('.input');
const words = select('.words');
const restart = select('.restart');
const stats = select('.stats');
const info = select('.info');
const start = select('.start');
const mainBox = select('.score-container');
const highscore = select('.highscore');
let scoreArray = [];
input.disabled = true;

const cookieBox = select('.cookie-box');
const center = select('.center');
const popup = select('.popup');

const dialog = select('dialog');
const hereOpen = select('.here-open');
const hereClose = select('.here');


// ---------------Audio-------------------


const point = new Audio('./assets/audio/point.wav');
point.type = 'audio/wav';

const level = new Audio('./assets/audio/level-completed.wav');
level.type = 'audio/wav';

const alltime = new Audio('./assets/audio/alltime.mp3');
alltime.type = 'audio/mp3';

// alltime.play();


const originalArray = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'];

let array = [...originalArray];

// ----------------Timer-----------------

let seconds = 10;
function getSeconds() {
    setInterval(function () {
        if (seconds > 0) {
            seconds--;
            timer.innerText = `:  ${seconds} seconds remaining`;

        } else {
            timer.innerText = 'Game over';
            statistics()
            // getScore();(
            setInterval(function () {

dialog.showModal();
}, 5000);
dialog.close();

        }
    }, 1000);
}

// ----------------------generateWords-------------

function generateWords(array) {
    let words1 = Math.floor(Math.random() * array.length);
    words.innerText = array[words1];
    array.splice(words1, 1);
}


// ----------------Trimming and lowercase------------------


let count = 0;
function check() {
    let input1 = input.value.toLowerCase();
    if (seconds <= 0) {
        input.value = '';
        words.innerText = '';
        level.play();
        getScore()
        dialog.showModal();


    } else if (input1 === words.innerText) {
        count++;
        point.play();
        hits.innerText = `Hits: ${count}`;
        input.value = '';
        generateWords(array);

    }
}

// -------------------date--------------------

let date = new Date();
let str = date.toString().substring(4, 15);

// -------------------percentage--------------------

function percentage() {
    let percent = (count / 90) * 100;
    return percent.toFixed(2);
}

// -------------------statistics--------------------

function statistics() {
    const newUser = new Score(str, count, percentage());
    stats.innerText = `${newUser.getData()}`;
    stats.style.visibility = 'visible';
    restart.style.visibility = 'visible';
    info.style.visibility = 'visible';

}

input.addEventListener('keyup', check);

// -----------------------------buttons------------------------

onEvent('click', restart, function () {
    hits.innerText = `Hits: 0`;

    count = 0;
    check()
    // getSeconds();
    seconds = 9;
    input.value = '';
    words.innerText = '';
    stats.innerText = '';
    array = [...originalArray];
    restart.style.visibility = 'hidden';
    info.style.visibility = 'hidden';
    generateWords(array);
});

onEvent('click', start, function () {
    getSeconds();
    generateWords(array);
    input.disabled = false;
    dialog.close();
    start.style.visibility = 'hidden';


});


window.addEventListener('load', () => {
    mainBox.style.visibility = 'visible';
    getScore();

    dialog.showModal();


})




onEvent('click', dialog, function (event) {
    const rect = this.getBoundingClientRect();
    if (event.clientY < rect.top || event.clientY > rect.bottom ||
        event.clientX < rect.left || event.clientX > rect.right) {
        dialog.close();
    }
})

// -------------------------Score---------------------------------


function getScore() {

    let percent = (count / 90) * 100;
    let percentage = percent.toFixed(2);

    const scoreObj = {
        hits: count,
        percentage: percentage

    };


    scoreArray.push(scoreObj);

    scoreArray.sort((a, b) => b - a);

    scoreArray.slice(0, 9);
    JSON.parse(localStorage.getItem('points'));
    localStorage.setItem('points', JSON.stringify(scoreArray));


    highscore.innerHTML = scoreArray.map((points) => `${points.hits} Words : ${points.percentage}%`);

}
