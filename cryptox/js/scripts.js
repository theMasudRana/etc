(function($) {
    'use strict';

    // All JavaScript pluging initialization code here

    /* --------------------------------
     Table Of Content
    -----------------------------------
        1 Mobile menu
        2. Portfolio activation
        3. Magnificpopup image gallery
        4. Magnificpopup video gallery
        5. Fact counter
        6. WOW Js
        7. Testimonial slider
        8. Brand logo slider
        9. Main Slider
        10. Scroll to top button
        11. Sticky header activation
        12. Rellax For Parallax
        13. Cryptox Google contact map
    ----------------------------------- */

    /* -----------------------------------
       1 Mobile menu
    ----------------------------------- */
    $('.mobile-menu').meanmenu();

    /* ----------------------------------
       2. Portfolio activation
    ----------------------------------- */
    $('.portfolio-section').imagesLoaded(function() {
        var $grid = $('.portfolio-grid').isotope({
            itemSelector: '.portfolio-item',
            percentPosition: true,
        })

        // Portfolio filtering activation
        $('.portfolio-filter li a').on('click', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });

        // Filter menu active class addition  
        $('.portfolio-filter li').on('click', function(event) {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });
    });
    /* ----------------------------------
       3. Magnificpopup image gallery
    ----------------------------------- */
    $('.project-zoom').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: {
            enabled: true
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('data-title');
            }
        }
    });

    /*-------------------------------------
      4. Magnificpopup video gallery
    --------------------------------------- */
    $('.video-play-icon').magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    /*---------------------------
     5. Fact counter
    -----------------------------*/
    $('.fact-number').counterUp({
        delay: 20,
        time: 3000
    });

    /*---------------------------
     6. WOW Js
    -----------------------------*/
    new WOW().init();

    /*---------------------------
     7. Testimonial slider
    -----------------------------*/
    // 
    var testimonialSlider = $('.testimonial-wrapper');
    testimonialSlider.slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 1 } },
            { breakpoint: 767, settings: { slidesToShow: 1 } },
            { breakpoint: 479, settings: { slidesToShow: 1 } },
        ]
    });

    /*---------------------------
     8. Brand logo slider
    -----------------------------*/
    var brandLogoSlider = $('.brand-logo-slider');
    brandLogoSlider.slick({
        dots: false,
        arrows: false,
        slidesToShow: 5,
        infinite: true,
        speed: 300,
        adaptiveHeight: false,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 4 } },
            { breakpoint: 767, settings: { slidesToShow: 3 } },
            { breakpoint: 481, settings: { slidesToShow: 2 } },
            { breakpoint: 321, settings: { slidesToShow: 2 } },
        ]
    });

    /*---------------------------
     9. Main Slider
    -----------------------------*/
    function mainSlider() {
        var xBootSlider = $('#xboot-slider');
        xBootSlider.on('init', function(e, slick) {
            var $firstAnimatingElements = $('.xboot-single-slide:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        });
        xBootSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
            var $animatingElements = $('.xboot-single-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
            doAnimations($animatingElements);
        });
        xBootSlider.slick({
            autoplay: false,
            autoplaySpeed: 10000,
            dots: false,
            fade: true
        });

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function() {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay
                });
                $this.addClass($animationType).one(animationEndEvents, function() {
                    $this.removeClass($animationType);
                });
            });
        }
    }
    mainSlider();
    
    /*-------------------------------------------
      10. Scroll to top button
    ---------------------------------------------*/
    $('body').append('<a id="back-to-top" class="to-top-btn" href="#"><i class="fa fa-angle-up"></i></a>');
    if ($('#back-to-top').length != 0) {
        var scrollTrigger = 100, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('to-top-show');
                } else {
                    $('#back-to-top').removeClass('to-top-show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    };

    /* -------------------- ---
     11. Sticky header activation
    ------------------ --------*/
    if ($('.sticky-header').length != 0) {
        $('.sticky-header').sticky({
            zIndex: 999
        });
    }

    /* -------------------- ---
     12. Rellax For Parallax
    ------------------ --------*/
    if ($('.rellax').length != 0) {
        var rellax = new Rellax('.rellax');
    }

    /* ------------------------------
     13. Cryptox Google contact map
    ---------------------------------*/

    if ($('#contact-map').length != 0) {
        // When the window has finished loading create our google map below
        google.maps.event.addDomListener(window, 'load', cryptoxMap);

        function cryptoxMap() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 11,
                scrollwheel: false,
                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(40.6700, -73.9400), // New York
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": .2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
            };
            // Get the HTML DOM element that will contain your map 
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('contact-map');

            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);

            // Let's also add a marker while we're at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.6700, -73.9400),
                map: map,
                title: 'Cryptox'
            });
        }
    }

})(jQuery)