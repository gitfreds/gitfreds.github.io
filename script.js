const setIntervalAsync = (fn, ms) => {
    fn().then(() => {
      setTimeout(() => setIntervalAsync(fn, ms), ms);
    });
};

function linksSetup(){

    // TODO: figure out how to do this with jquery?

    console.log("linksSetup() called")
    
    var comingSoon = "https://freddiewangwrites.medium.com/coming-soon-10b49f0d72cd";

    var allLinks = document.getElementsByTagName("a");

    console.log(allLinks.length)
    console.log(allLinks[0].pathname)
    // console.log(allLinks[0].)

    for(var i=0, max=allLinks.length; i<max; i++) {
        if (allLinks[i].dataset.set == "no"){
            console.log("not link found")
            allLinks[i].href = comingSoon
        }
    }

}

function initTheme(){
    let theme = localStorage.getItem('theme-mode')

    if(theme == null || theme == 1){
        document.getElementById('theme-style').href = 'default.css'
        document.getElementById("inner-text").innerText = "Click above if beige isn't your thing!"
        localStorage.setItem("theme-mode", 1)
    } 
    else if (theme == -1) {
        document.getElementById('theme-style').href = 'dark.css'
        document.getElementById("inner-text").innerText = "Hey! I remembered your theme!"
    }
    else {
        console.log("error setting initial theme")
    }
}

function themeDotSetup(){
    let themeChangerBottom = document.getElementsByClassName("theme-clickable-bottom")
    let rotater = document.getElementById("rotater")
    var spin = false

    for (var i=0; themeChangerBottom.length > i; i++) {

        themeChangerBottom[i].addEventListener("click", function() {
            console.log("theme change clicked!")
            if(spin){
                rotater.className = 'theme-dot-wrapper';  
            } else{
                rotater.className = 'theme-dot-wrapper rotate';
            }
            spin = !spin;
            toggleTheme()
        })
    }

    let themeChangerTop = document.getElementById("theme-clickable-top")
    themeChangerTop.addEventListener("click", function() {
        console.log("theme change clicked!")
        if(spin){
            rotater.className = 'theme-dot-wrapper';  
        } else{
            rotater.className = 'theme-dot-wrapper rotate';
        }
        spin = !spin;
        toggleTheme()
    })

    // how to simple spin
    // https://stackoverflow.com/questions/31108800/css-animation-toggle-rotate-on-click/31108952
}

function toggleTheme() {

    let currTheme = localStorage.getItem('theme-mode')
    currTheme *= -1

    if(currTheme == 1){
        document.getElementById('theme-style').href = 'default.css'
        document.getElementById("inner-text").innerText = "Click above if beige isn't your thing!"
    }

    else if(currTheme == -1){
        document.getElementById('theme-style').href = "dark.css"
        document.getElementById("inner-text").innerText = "I'll save this theme for your next visit!"

    }

    else {
        console.log("invalid theme set! Using defualt")
        document.getElementById('theme-style').href = 'default.css'
        document.getElementById("inner-text").innerText = "Click above if beige isn't your thing!"

    }

    localStorage.setItem("theme-mode", currTheme)
    console.log(localStorage.getItem('theme-mode'))

}


function renderTime(){

    const delayReport = deplayMs => new Promise((resolve) => {
        setTimeout(resolve, deplayMs);
    });
    
    var currTime = new Date()

    var hours = currTime.getHours()
    var minutes = currTime.getMinutes()

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var displayTime = hours + ":" + minutes;

    document.getElementById("curr-time").innerText = displayTime;

    console.log(displayTime);
    // setInterval(renderTime, 1000 * 3)
}


// https://dev.to/akanksha_9560/why-not-to-use-setinterval--2na9
setIntervalAsync(async () => renderTime(), 1000);

console.log("Working2!")
initTheme()
themeDotSetup()
linksSetup()
