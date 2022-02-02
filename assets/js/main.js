/**
 * Template Name: Ho Health V1.0
 */
(function() {
    "use strict";


    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }


    let selecthormones = select('#hormonesList')
    if (selecthormones) {
        var hormonesList = document.getElementById("hormonesList");
        var cln = hormonesList.cloneNode(true);
        document.getElementById("hormonesSlider").appendChild(cln);
    }

    let selectMarquee = select('#MarqueeSlider')
    if (selectMarquee) {
        var MarqueeSliderText = document.getElementById("MarqueeSliderText");
        var cln = MarqueeSliderText.cloneNode(true);
        document.getElementById("MarqueeSlider").appendChild(cln);
    }



    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        var last_scroll_top = 0;
        const headerScrolled = () => {

            if (window.scrollY > 200) {
                let scroll_top = window.scrollY;
                if (scroll_top < last_scroll_top) {
                    selectHeader.classList.add('header-scrolled')
                    selectHeader.classList.add('fixed-top')
                    selectHeader.classList.remove('fixed-absolute')
                } else {
                    selectHeader.classList.remove('header-scrolled')
                    selectHeader.classList.remove('fixed-top')
                    selectHeader.classList.add('fixed-absolute')
                }
                if (screen.width > 767) {
                    setTimeout(ScrollMenu, 2000)
                } else {
                    setTimeout(ScrollMenu, 3000)
                }

                last_scroll_top = scroll_top;
            } else {
                selectHeader.classList.remove('header-scrolled')
                selectHeader.classList.remove('fixed-top')
                selectHeader.classList.add('fixed-absolute')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    function ScrollMenu() {
        if (window.scrollY > 200) {
            selectHeader.classList.add('header-scrolled')
            selectHeader.classList.add('fixed-top')
            selectHeader.classList.remove('fixed-absolute')
        }
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        var height = document.body.scrollHeight;
        const toggleBacktotop = () => {
            if (window.scrollY > 500) {
                var Pheight = window.innerHeight;
                var offsetHeight = document.getElementById('footer').offsetHeight;
                var offsettop = document.getElementById('footer').offsetTop;

                if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - offsetHeight)) {
                    backtotop.classList.remove('fixedposition')
                    var bottom = 32;
                    if (screen.width < 767) {
                        bottom = 16;
                    }
                } else {
                    backtotop.classList.add('fixedposition')
                    var bottom = 32;
                    if (screen.width < 767) {
                        bottom = 16;
                    }
                }
                document.getElementById('backtotop').style.bottom = bottom + 'px';
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('mlist')
        this.classList.toggle('mclose')
    })

    on('click', '.back-to-top', function(e) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('mlist')
                navbarToggle.classList.toggle('mclose')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });






    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });


    });

})()

/*//after window is loaded completely 
window.onload = function() {
    //hide the preloader
    document.querySelector("#preloader-active").style.display = "none";
}*/