let slideIndex = 0, previousPosition = 0, currentPosition = 0;
let interval = -12226*window.innerHeight/(11500); // Setting Background sliding window based on device dimensions

// Commonly used elements
const nextButton = document.querySelector('.arrow-navigation .next');
const previousButton = document.querySelector('.arrow-navigation .previous');
const sidebar = document.querySelector('.sidebar');
const navigationDots = document.querySelectorAll('.dot');

// Add Event listeners for navigations
document.querySelector(".arrow-navigation .next").addEventListener("click", () => changeSlide(slideIndex+1));
document.querySelector(".arrow-navigation .previous").addEventListener("click", () => changeSlide(slideIndex-1));
document.querySelector(".navigation").addEventListener("click", evt => {
    let element;
    // Fetch the element with "dot" class
    if (evt.target.className.includes('dot')) element = evt.target;
    else if (evt.target.parentElement.className.includes('dot')) element = evt.target.parentElement;
    else return;
    
    changeSlide(parseInt(element.dataset['id']));
})

// A function to switch slides
function changeSlide(index) {
    if (slideIndex === index) return; // Removing redundant triggers

    // show or hide navigation arrows based on the slide index
    nextButton.style.display = "flex";
    previousButton.style.display = "flex";
    if (index === 0) previousButton.style.display = "none";
    else if (index === 9) nextButton.style.display = "none";
    
    // hiding sidebar if opened previously
    if (slideIndex === 9) {
        sidebar.animate({right: [`0`, `-100%`]}, 500);
        sidebar.style.right = "-100%";
    }

    // Switching background for the requested slide
    let mainContainer = document.querySelector(".main-container");
    slideIndex = index;
    previousPosition = currentPosition;
    currentPosition = interval*slideIndex;
    if (slideIndex === 9) {
        sidebar.animate({right: [`-100%`, `0`]}, 500);
        sidebar.style.right = "0";
    }
    mainContainer.animate({backgroundPositionX: [`${previousPosition}px`, `${currentPosition}px`]}, 500);
    mainContainer.style.backgroundPositionX = `${currentPosition}px`;
    
    // Activating navigation dot
    navigationDots.forEach(dot => {
        if (parseInt(dot.dataset['id']) === slideIndex) dot.classList.add('active');
        else dot.classList.remove('active'); 
    })

    // Activating the requested slide
    document.querySelector('.slide.active')?.classList.remove('active');
    document.querySelector('#slide-'+slideIndex).classList.add('active');

}