var owlPlugin = function () {
    if ($('.owl-3-slider').length > 0) {
        var owl3 = $('.owl-3-slider').owlCarousel({
            loop: true, autoHeight: true, margin: 40,
            autoplay: true, smartSpeed: 700, items: 4,
            stagePadding: 0, nav: true, dots: true,
            navText:
                ['<span class=\"icon-keyboard_backspace\"></span>', '<span class=\"icon-keyboard_backspace\"></span>'],
            responsive: { 0: { items: 1 }, 600: { items: 1 }, 800: { items: 2 }, 1000: { items: 2 }, 1100: { items: 3 } }
        });
    }
    $('.js-custom-next-v2').click(function (e) {
        e.preventDefault(); owl3.trigger('next.owl.carousel');
    });
    $('.js-custom-prev-v2').click(function (e) {
        e.preventDefault(); owl3.trigger('prev.owl.carousel');
    }); if ($('.owl-4-slider').length > 0) {
        var owl4 = $('.owl-4-slider').owlCarousel({
            loop: true, autoHeight: true, margin: 10, autoplay: true, smartSpeed: 700,
            items: 4, nav: false, dots: true,
            navText: ['<span class=\"icon-keyboard_backspace\"></span>', '<span class=\"icon-keyboard_backspace\"></span>'],
            responsive: { 0: { items: 1 }, 600: { items: 2 }, 800: { items: 2 }, 1000: { items: 3 }, 1100: { items: 4 } }
        });
    } if ($('.owl-single-text').length > 0) {
        var owlText = $('.owl-single-text').owlCarousel({
            loop: true, autoHeight: true, margin: 0, autoplay: true, smartSpeed: 1200,
            items: 1, nav: false,
            navText: ['<span class=\"icon-keyboard_backspace\"></span>', '<span class=\"icon-keyboard_backspace\"></span>']
        });
    } if ($('.events-slider').length > 0) {
        var owl = $('.events-slider').owlCarousel({
            loop: true, autoHeight: true, margin: 0, autoplay: true, smartSpeed: 800,
            mouseDrag: false, touchDrag: false, items: 1, nav: false,
            navText: ['<span class=\"icon-keyboard_backspace\"></span>', '<span class=\"icon-keyboard_backspace\"></span>'],
        });
    } if ($('.owl-single').length > 0) {
        var owl = $('.owl-single').owlCarousel({
            loop: true, autoHeight: true, margin: 0, autoplay: true, smartSpeed: 800,
            mouseDrag: false, touchDrag: false, items: 1, nav: false,
            navText: ['<span class=\"icon-keyboard_backspace\"></span>', '<span class=\"icon-keyboard_backspace\"></span>'], onChanged: changed,
        }); function changed(event) { var i = event.item.index; if (i == 0 || i == null) { i = 1; } else { i = i - 1; $('.js-custom-dots li').removeClass('active'); $('.js-custom-dots li[data-index=\"' + i + '\"]').addClass('active'); } } $('.js-custom-dots li').each(function (i) { var i = i + 1; $(this).attr('data-index', i); }); $('.js-custom-dots a').on('click', function (e) { e.preventDefault(); owl.trigger('stop.owl.autoplay'); var k = $(this).closest('li').data('index'); k = k - 1; owl.trigger('to.owl.carousel', [k, 500]); })
    }
    if ($('.wide-slider-testimonial').length > 0) {
        $('.wide-slider-testimonial').owlCarousel({
            loop: true, autoplay: true, margin: 0, animateOut: 'fadeOut', animateIn: 'fadeIn', nav: false, autoplayHoverPause: false, items: 1, autoHeight: true, navText: ["<span class='ion-android-arrow-dropleft'></span>", "<span class='ion-android-arrow-dropright'></span>"], responsive: { 0: { items: 1, nav: false }, 600: { items: 1, nav: false }, 1000: { items: 1, nav: false } }
        });
    }
    if ($('.testimonial-slider').length > 0) {
        $('.testimonial-slider').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            autoplay: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
        })
    }
}; owlPlugin();