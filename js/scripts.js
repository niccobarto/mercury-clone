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
/*
<div className="sub-bar-container">
    <ul className="ul-sub-bar">
        <li><a href="#">Subscribe</a></li>
        <li><a href="#">Log in</a></li>
    </ul>
</div>
<div className="search-bar">
    <button type="submit">
        <img src="images/search-bar-icon.png" className="search-bar-icon" alt="search icon"/>
    </button>
</div>
 */

