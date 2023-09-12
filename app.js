
const heureContainer = document.querySelector(".heures");
const minutesContainer = document.querySelector(".minutes");
const secondesContainer = document.querySelector(".seconde");
const targetTimeElement = document.getElementById('target-time');
const buttons = document.querySelectorAll("button");
const durationInput = document.getElementById("duration-input")







let countdown;
let timer;

function startCountdown(duration, inMinutes) {
    if (inMinutes) {
        duration *= 60;
    }
    heureContainer.style.display = "block";
    minutesContainer.style.display = "block";
    secondesContainer.style.display = "block";
    targetTimeElement.style.display = "block";

    const currentTime = new Date();
    const targetTime = new Date(currentTime.getTime() + duration * 1000);
    updateTargetTime(targetTime);

    countdown = duration
    updateCountdown();
    clearInterval(timer);
    timer = setInterval(() => {
        countdown--;
        if (countdown < 0) {
            clearInterval(timer);
            heureContainer.style.display = "none";
            minutesContainer.style.display = "none";
            secondesContainer.style.display = "none";
            targetTimeElement.style.display = "none";
        } else {
            updateCountdown();
        }
    }, 1000);
}

function updateCountdown() {
    const heures = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;


    if (heures < 10) {
        heureContainer.textContent = `0${heures}:`
    } else {
        heureContainer.textContent = `${heures}:`
    };

    if (minutes < 10) {
        minutesContainer.textContent = `0${minutes}:`;
    } else {
        minutesContainer.textContent = `${minutes}:`;
    };

    if (seconds < 10) {
        secondesContainer.textContent = `0${seconds}`;
    } else {
        secondesContainer.textContent = `${seconds}`;
    }


}

function updateTargetTime(time) {
    const formattedTime = time.toLocaleTimeString();
    targetTimeElement.textContent = `Be Back At ${formattedTime}`;
}


durationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const enteredMinutes = parseFloat(durationInput.value);
        if (!isNaN(enteredMinutes)) {
            startCountdown(enteredMinutes, true);
        }
    }
});

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
       
        let duration;
        let inMinutes = true
        switch (index) {
            case 0:
                duration = 20;
                inMinutes = false
                break;
            case 1:
                duration = 5;
                break;
            case 2:
                duration = 15;
                break;
            case 3:
                duration = 20;
                break;
            case 4:
                duration = 30;
                break;
            default:
                break;
        }

        startCountdown(duration, inMinutes)
    });
});
