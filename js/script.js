//check if there is local storage color option
let mainColors = localStorage.getItem("color_option");
console.log(mainColors);

if (mainColors == !null) {
    // console.log('local storage is not empty oyu can set it on root now');
    //console.log(localStorage.getItem('color_option'));
    document.documentElement.style.setProperty('--mainColor', mainColors);
    //remove active class from all list items
    document.querySelectorAll('.colors-list li').forEach(element => {
        element.classList.remove('active');
        // add active class with element === local storage
        if (element.dataset.color === mainColors) {
            //add active class
            element.classList.add('active');
        }
    });

}

//random background option
let backgroundOption = true;
//var to control the interval
let theBackgroundInterval;
//check if there is local storage random background image
let backgroundLocalItem = localStorage.getItem('background_options');
//chek if random bg local storage not empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true
    } else {
        backgroundOption = false
    }
    console.log(backgroundLocalItem);
}
document.querySelectorAll('.random-backgrounds span').forEach(element => {
    element.classList.remove('active');
});
if (backgroundLocalItem == 'true') {
    document.querySelector('.yes').classList.add('active');
} else {
    document.querySelector('.no').classList.remove('active');

}
//toggle spin class on icon
document.querySelector('.toggle-settings .icon').onclick = function() {
    //toglle class spin on self
    this.classList.toggle('fa-spin');
    //toggle class open on settings-box
    document.querySelector('.settings-box').classList.toggle('open');
};
//switch color
const colorsLi = document.querySelectorAll('.colors-list li');
//loop in all list item
colorsLi.forEach(li => {
    //click on every list item
    li.addEventListener('click', (e) => {
        //set color in root
        document.documentElement.style.setProperty('--mainColor', e.target.dataset.color);
        //set color in local storaage
        localStorage.setItem('color_option', e.target.dataset.color);

        handleActive(e);
    });
});
//random backgrond optipns

const randomBackEl = document.querySelectorAll('.random-backgrounds span');
//loop on all spans
randomBackEl.forEach(span => {
    //click on every list item
    span.addEventListener('click', (e) => {
        handleActive(e);
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem('background_options', true);
        } else {
            backgroundOption = false;
            clearInterval(theBackgroundInterval);
            localStorage.setItem('background_options', false);
        }
    });
});

//select landing page element
let theLandingPage = document.querySelector('.landing-page');
//get array of image
let imgsArray = ['01.png', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];

//  function to randomize image
function randomizeImg() {
    if (backgroundOption === true) {
        theBackgroundInterval = setInterval(() => {
            //get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //change background image url
            theLandingPage.style.backgroundImage = 'url("img/' + imgsArray[randomNumber] + '")';
        }, 1000)
    }
}
randomizeImg()


//select skills selector
let ourSkills = document.querySelector('.skills');
window.onscroll = function() {
        //skills offset top
        let skillOffsetTop = ourSkills.offsetTop;
        //skills outer height
        let skillOuterHeight = ourSkills.offsetHeight;
        //window height
        let windowHeight = this.innerHeight;
        //widow scroll top
        let windowScrollTop = this.pageYOffset;

        if (windowScrollTop > (skillOffsetTop + skillOuterHeight - windowHeight)) {
            let allSkills = document.querySelectorAll('.skills .skill-box span');
            console.log(allSkills);
            allSkills.forEach(skill => {
                skill.style.width = skill.dataset.progress;
            });
        }
    }
    // create popup with hte image
let ourGallery = document.querySelectorAll('.gallery img');
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        //craete overlay element
        let overlay = document.createElement('div');
        //add class to overlay
        overlay.className = 'popup-overlay';
        //append overlay to the body
        document.body.appendChild(overlay);
        //create the popup box
        let popupBox = document.createElement('div');
        //add class to the pop up box
        popupBox.className = "popup-box";
        if (img.alt !== null) {
            //create heading
            let imgHeading = document.createElement('h3');
            //create text for heading
            let imgText = document.createTextNode(img.alt);
            //append the text to the heading
            imgHeading.appendChild(imgText);
            //append the heading to the popup box 
            popupBox.appendChild(imgHeading);
        }
        //create the image
        let popupImage = document.createElement('img');
        //set the image source
        popupImage.src = img.src;
        //add image to the popup box
        popupBox.appendChild(popupImage);
        //append the popup box to the body
        document.body.appendChild(popupBox);
        //create the close span
        let closeButton = document.createElement('span');
        //create the close button text
        let closeButtonText = document.createTextNode('x');
        //aapend text to the close button 
        closeButton.appendChild(closeButtonText);
        //add class to the close button 
        closeButton.className = 'close-button';
        //add class button to the popup box
        popupBox.appendChild(closeButton);

    });
});
//close the popup
document.addEventListener('click', (e) => {

    if (e.target.className == ('close-button')) {
        //remove the current popup
        e.target.parentNode.remove();
        //remove overlay
        document.querySelector('.popup-overlay').remove();
    }
});

const allBullets = document.querySelectorAll('.bullet');
const allLinks = document.querySelectorAll('.links a');


function scrolltoSomewhere(elements) {
    elements.forEach(ele => {
        ele.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}
scrolltoSomewhere(allBullets);
scrolltoSomewhere(allLinks);
//handle active state
function handleActive(ev) {
    //remove class active from all children
    ev.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
    });
    //add class active on itself
    ev.target.classList.add('active');
}

let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletsLocalItem = localStorage.getItem('bullets-option');
if (bulletsLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });
    if (bulletsLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add('active');
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add('active');

    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullets-option', 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullets-option', 'none');

        }
        handleActive(e);

    });

});
//reset button
document.querySelector('.reset-options').onclick = function() {
    localStorage.clear();
    window.location.reload();
}