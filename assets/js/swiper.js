/**
 * Template Name: Ho Health V1.0
 */
(function() {
    "use strict";


    /**
     * Break down Slider
     */
    new Swiper('.break-slider', {
        speed: 400,
        loop: false,
        centeredSlides: false,
        autoplay: false,
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        on: {
            imagesReady: function() {
                console.log('swiper initialized');
                var swiperimg = document.querySelector('.SwiperImg').scrollHeight;
                console.log(swiperimg);
                document.getElementById('swiperPagination').style.top = swiperimg + 'px';
            },
        }
    });





})()