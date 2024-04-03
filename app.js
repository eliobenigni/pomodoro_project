const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const [minuteDiv, secondDiv] = document.querySelectorAll('.minutes, .seconds');
const sessionAmount = parseInt(document.querySelector('.minutes').textContent, 10);
let myInterval;
let state = true;
let gradientIndex = 0;
const gradients = [
    'linear-gradient(-20deg, #025159 0%, #733b36 100%)',
    'linear-gradient(-20deg, #485e91 0%, #2f1b58 100%)',
    'linear-gradient(-20deg, #ff6b6b 0%, #ffe66d 100%)',
    'linear-gradient(-20deg, #89f7fe 0%, #66a6ff 100%)'
];

const changeBackground = () => {
    document.body.style.backgroundImage = gradients[gradientIndex];
    document.documentElement.style.backgroundImage = gradients[gradientIndex];
    gradientIndex = (gradientIndex + 1) % gradients.length;
}

const updateTimerDisplay = (minutesLeft, secondsLeft) => {
    if (secondsLeft < 10) {
        secondDiv.textContent = `0${secondsLeft}`;
    } else {
        secondDiv.textContent = secondsLeft;
    }
    minuteDiv.textContent = `${minutesLeft}`;
}

const appTimer = () => {
    if (state) {
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            totalSeconds--;
            const minutesLeft = Math.floor(totalSeconds / 60);
            const secondsLeft = totalSeconds % 60;

            updateTimerDisplay(minutesLeft, secondsLeft);

            if (minutesLeft === 0 && secondsLeft === 0) {
                clearInterval(myInterval);
                bells.play();
            }
        }
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert("Session already started!");
    }

    changeBackground();
}

startBtn.addEventListener('click', appTimer);



