// script.js

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let duration = 25 * 60; // Default 25 minutes in seconds
let timeLeft = duration;
let timerInterval;
let isPaused = false;
let isRunning = false;

// Sound notification for the end of the session
const sound = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3');

function startTimer() {
    if (!isRunning || isPaused) {
        isPaused = false;
        isRunning = true;

        timerInterval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            updateProgress();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                sound.play();
                startBreak();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning && !isPaused) {
        clearInterval(timerInterval);
        isPaused = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = duration;
    updateDisplay();
    updateProgress();
    isPaused = false;
    isRunning = false;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgress() {
    const progress = timeLeft / duration;
    const offset = circumference * progress;
    circle.style.strokeDashoffset = offset;
}

function startBreak() {
    duration = 5 * 60; // 5-minute break
    timeLeft = duration;
    startTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Initialize the display
updateDisplay();
