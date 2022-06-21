//rocket elements
const rocketInstructions = document.getElementById('rocket-instructions');
const resetButton = document.getElementById('reset-button');
const progressbar = document.getElementById('progress-bar');
const progressElement = document.getElementById('progress');
const rocket = document.getElementById('rocket');
const rocketArea = document.getElementById('rocket-area');


//thumbnail elements
const thumb1 = document.getElementById('thumb-1');
const thumb2 = document.getElementById('thumb-2');
const thumb3 = document.getElementById('thumb-3');
const thumb4 = document.getElementById('thumb-4');
const thumb5 = document.getElementById('thumb-5');

const thumbs = [thumb1, thumb2, thumb3, thumb4, thumb5];

//image paths
const img1Path = ""; //no image, just plain background
const img2Path = "./resources/city-1.jpg";
const img3Path = "./resources/forest-1.webp";
const img4Path = "./resources/forest-2.webp";
const img5Path = "./resources/mars.jpg";

const imgPaths = [img1Path, img2Path, img3Path, img4Path, img5Path];


let currentThumb = thumb1; //current thumbnail image is the first one
let currentImgPath = img1Path; //current image path is the first one

let progressPercent = 0; //Rocket charge percentage

let evenIteration = true; //Used for animations that need to be activated multiple times


//charges rocket by 10% until it gets to 100%, then launches rocket
function chargeRocket(){

    rocketInstructions.style.display = 'none'; //make rocket instructions disappear

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
        rocket.removeEventListener('click', chargeRocket); //prevent overcharging of rocket

        progressElement.style.backgroundColor = 'hsl(20, 100%, 60%)'; //change progress bar color to orange
        rocket.style.animation = 'flyaway 1s ease-in 0.6s forwards, shake2 0.1s linear 5 alternate';
        //display reset button 2.5s after animation starts
        setTimeout( () => {
            resetButton.style.display = 'block';
        }, 2500);
    }

}


//resets progress to 0% and flies a new rocket in
function resetRocket(){
    progressPercent = 0;
    progressElement.style.width = `${progressPercent}%`;
    progressElement.style.backgroundColor = 'blueviolet';
    rocket.style.animation = `flyin 2s ease-out forwards`;
    rocket.addEventListener('click', chargeRocket);
    
    resetButton.style.display = 'none'; //hide reset button
    rocketInstructions.style.display = 'block'; //display rocket instructions again
}

//activates on click on thumbnails, changes image displayed behind rocket
function changeImage( event ){
    //Take the focus off the current thumbnail
    currentThumb.style.border = 'none';
    currentThumb.style.opacity = '50%';
    currentThumb.addEventListener('mouseout', thumbMouseout); //allows thumbnail to be de-focused on

    //Put the focus on the new image thumbnail
    event.target.style.border = '3px solid hsl(240, 30%, 30%)';
    event.target.style.opacity = '100%';
    event.target.removeEventListener('mouseout', thumbMouseout); //prevents thumbnail from being defocused

    //set new image thumbnail as current image thumbnail
    currentThumb = event.target;

    //set new image behind rocket
    let imageIndex = thumbs.indexOf(currentThumb);
    rocketArea.style.backgroundImage = `url(${imgPaths[imageIndex]})`;
    currentImgPath = imgPaths[imageIndex];
}

/*
Activates on mouseover on thumbnails, changes opacity to 100%,
*/
function thumbMouseover( event ){
    event.target.style.opacity = '100%';
}

/*
Activates on mouseout on thumbnails, changes opacity to 50%
*/
function thumbMouseout( event ){
    event.target.style.opacity = '50%';
}


//when the rocket is clicked, the rocket charges
rocket.addEventListener('click', chargeRocket);
//when the reset button is clicked, a new rocket flies in 
resetButton.addEventListener('click', resetRocket);

//add event listeners to all the thumbnail elements
for (thumbElement of thumbs){
    thumbElement.addEventListener('click', changeImage);
    thumbElement.addEventListener('mouseover', thumbMouseover);
    thumbElement.addEventListener('mouseout', thumbMouseout);
}


//put focus on first thumbnail
currentThumb.style.border = '3px solid hsl(240, 30%, 30%)';
currentThumb.removeEventListener('mouseout', thumbMouseout);
