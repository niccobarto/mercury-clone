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


function hideOverflowingItems() {
    const container = document.querySelector('.trending-nav');
    const items = document.querySelectorAll('.trending-list li');

    items.forEach(item => {
        item.style.display = 'inline-block'; // Reset visibilità
    });

    const containerRight = container.getBoundingClientRect().right;

    items.forEach(item => {
        const itemRight = item.getBoundingClientRect().right;
        if (itemRight > containerRight) {
            item.style.display = 'none'; // Se va fuori, lo nascondo
        }
    });
}

function toggleSearchBar(){
    const form    = document.getElementById('search-bar-form');
    if (!form) return;

    const wrapper = form.closest('.top-bar-form');
    if (!wrapper) return;

    const isOpen  = wrapper.classList.toggle('search-open');

    if (isOpen){
        form.querySelector('.search-input')?.focus();
        document.body.classList.add('noscroll');
    }else{
        document.body.classList.remove('noscroll');
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const sentinella = document.querySelector('.sentinella-stick');
    const fixedTop = document.querySelector('.fixed-top');

    if (!sentinella || !fixedTop) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) {
                fixedTop.classList.add('fixed');
            } else {
                fixedTop.classList.remove('fixed');
            }
        },
        {
            root: null,
            threshold: 0
        }
    );

    observer.observe(sentinella);
});
window.addEventListener('load', hideOverflowingItems);
window.addEventListener('resize', hideOverflowingItems);
window.addEventListener('DOMContentLoaded', weatherDate);