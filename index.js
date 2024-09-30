import questions from "./questions.js";
import { levelsComponent, renderQuestions, renderGameOverDisplay } from "./components.js";

const timer = document.getElementById('timer'),
    display = document.getElementById('display'),
    buttonsContain = document.getElementById('buttons-contain');


let timerId;
let seconds = 0;
let penalty = 0;
let selectedQuestions = [];
let isOnGame = false;
let scrollPosition = 0;
let index = 0;
let count;

function startTimer() {
    timerId = setInterval(() => {
        timer.textContent = ++seconds;
    }, 1000)
}

function endTimer(id) {
    clearInterval(id);
    let endSeconds = seconds;
    seconds = 0;
    timer.textContent = seconds;
    return endSeconds;
}

function randomNumber1to50() {
    return Math.floor(Math.random() * 50)
}

function showQuestions(count) {
    for (let i = 0; i < count; i++) {
        selectedQuestions.push(questions[randomNumber1to50()])
    }
    display.innerHTML = renderQuestions(selectedQuestions);
}

function gameEnd() {
    buttonsContain.removeEventListener('click', gameProcess)
    isOnGame = false;
    display.innerHTML = renderGameOverDisplay(seconds, penalty);
    if (count == 10 && (+localStorage.getItem('record1') > seconds + penalty || !localStorage.getItem('record1'))) {
        localStorage.setItem('record1', seconds + penalty)
    } else if (count == 20 && (+localStorage.getItem('record2') > seconds + penalty || !localStorage.getItem('record2'))) {
        localStorage.setItem('record2', seconds + penalty)
    } else if (count == 30 && (+localStorage.getItem('record3') > seconds + penalty || !localStorage.getItem('record3'))) {
        localStorage.setItem('record3', seconds + penalty)
    }
    endTimer(timerId);
    document.getElementById('playAgainBtn').addEventListener('click', renderLevelsDisplay)

}


function gameProcess(e) {
    const questionsList = document.querySelector('.questions');

    if (!e.target.dataset.truthy || !isOnGame) return;

    if (e.target.dataset.truthy !== String(selectedQuestions[index].truthy)) {
        penalty += 2;
    }
    index++;
    if (index >= count) {
        // game end 
        gameEnd()
    }

    // scroll efect
    questionsList.scrollTo({
        top: scrollPosition + 70,
        behavior: 'smooth'
    })
    scrollPosition += 70;
}


function resetGame() {
    index = 0;
    scrollPosition = 0;
    seconds = 0;
    penalty = 0;
    selectedQuestions = [];
    isOnGame = true;
}

function startGame() {
    resetGame()

    // timer
    startTimer();
    // render questions
    showQuestions(count);

    buttonsContain.addEventListener('click', gameProcess)

}



function renderLevelsDisplay() {
    display.innerHTML = levelsComponent.render();
    const levels = document.querySelector('.levels');
    levels.addEventListener('click', (e) => {
        count = e.target.dataset.count
        startGame();
    })
}





document.addEventListener('DOMContentLoaded', () => {
    renderLevelsDisplay();
})


