let chargeButton = document.getElementById('charge-button');
let resetButton = document.getElementById('reset-button');
let progressbar = document.getElementById('progress-bar');
let progressElement = document.getElementById('progress');
let rocket = document.getElementById('rocket');
let rocketArea = document.getElementById('rocket-area');


let progressPercent = 0;
let evenIteration = true;
let backgroundImageIndex = 0;


//charges rocket by 10% until it gets to 100%, then launches rocket
function chargeRocket(){
    //reset animation style
    rocket.style.animation = 'none';
    progressPercent += 10;
    progressElement.style.width = `${progressPercent}%`;
    //shake rocket a few times, alternate shake animation every time we charge rocket
    if (evenIteration === true){
        rocket.style.animation = `shake 0.1s linear 5 alternate`;
        evenIteration = false;
    } else {
        rocket.style.animation = `shake2 0.1s linear 5 alternate`;
        evenIteration = true;
    }
    

    if (progressPercent === 100){ //launch rocket at 100%
        rocket.style.animation = 'flyaway 1s ease-in 0.6s forwards, shake2 0.1s linear 5 alternate';
        //switch out the buttons
        resetButton.style.display = 'block';
        chargeButton.style.display = 'none';
    }


}

//when the charge button is clicked, the rocket charges
chargeButton.addEventListener('click', chargeRocket);

//resets progress to 0% and flies a new rocket in
function resetRocket(){
    progressPercent = 0;
    progressElement.style.width = `${progressPercent}%`;
    rocket.style.animation = `flyin 2s ease-out forwards`;
    //switch out the buttons
    resetButton.style.display = 'none';
    chargeButton.style.display = 'block';
}

//when the reset button is clicked, a new rocket flies in 
resetButton.addEventListener('click', resetRocket);

//change the background image of the rocket area
function changeBackground() {
    //array containing directories of background images
    const backgroundImages = [' ', './resources/city-background1.jpg', './resources/forest_background_1.webp','./resources/forest_background_2.webp'];
    //iterate background image index
    backgroundImageIndex++;
    if (backgroundImageIndex > backgroundImages.length - 1){
        backgroundImageIndex = 0;
    }

    rocketArea.style.backgroundImage = `url(${backgroundImages[backgroundImageIndex]})`;

}

//when the rocket area is clicked, its background image changes
rocketArea.addEventListener('click', changeBackground);
