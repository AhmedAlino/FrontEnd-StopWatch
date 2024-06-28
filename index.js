const timer = document.querySelector('#timer');

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

const resetButton = document.querySelector('#reset');
const lapsButton = document.querySelector('#lap');

let timerController = 0;
let minutes = 0;
let seconds = 0;
let milliSeconds = 0;

let isClockRunning = false;

function startClock() {
    if (!isClockRunning) {
        timerController = setInterval(() => {
            isClockRunning = true;
            timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliSeconds).padStart(2, '0')}`;
            if (milliSeconds === 60) {
                seconds++;
                milliSeconds = 0;
            }
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            milliSeconds++;
        }, );
    }
}
startButton.addEventListener('click', startClock);

stopButton.addEventListener('click', () => {
    if (isClockRunning) {
        clearInterval(timerController);
        isClockRunning  = false;
    }
});

let lapsList = document.querySelector('#laps');
let counter = 0;

lapsButton.addEventListener("click", () => {
    let element = document.createElement("li");
    element.setAttribute("class", "time-lap");
    element.style.listStyleType = "none";
    element.innerHTML = `${timer.innerHTML}`;
    lapsList.appendChild(element)
    counter++;
});

resetButton.addEventListener("click", () => {
    minutes = 0;
    seconds = 0;
    milliSeconds = 0;

    if (isClockRunning) {
        clearInterval(timerController);
        isClockRunning = false;
    }

    timer.innerHTML = `00:00:00`;

    while (counter > 0) {
        lapsList.querySelector('#laps li').remove();
        counter--;
    }

});