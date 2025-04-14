function toggleMenu() {
    const hamburger = document.getElementById('hamburger');

    // Prendi tutti gli span dentro il div hamburger
    const spans = hamburger.querySelectorAll('span');

    // Prendi lo stile del primo span (o quello che ti interessa modificare)
    const currentMargin = window.getComputedStyle(spans[0]).margin;

    if (currentMargin !== "0px") {
        for (let i = 0; i < hamburger.querySelectorAll('span').length; i++) {
            spans[i].style.margin = "0px";
        }
    } else {
        for (let i = 0; i < hamburger.querySelectorAll('span').length; i++) {
            spans[i].style.margin = "1px";
        }
    }
}

function weatherDate(){
    const datelab=document.getElementById('date-label');
    const today = new Date();
    const weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekDay=weekDays[today.getDay()];
    const day=today.getDate().toString();
    const month=months[today.getMonth()];
    const year=today.getFullYear();
    const formatDate=`${weekDay}, ${month} ${day}th ${year}`;
    datelab.innerHTML=formatDate;
}
