(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			// global: { href: '/css/style.css', containers: '45em', grid: { gutters: ['2em', 0] } },
			xlarge: { media: '(max-width: 1680px)', href: '/css/style-xlarge.css' },
			large: { media: '(max-width: 1280px)', href: '/css/style-large.css', containers: '42em', grid: { gutters: ['1.5em', 0] }, viewport: { scalable: false } },
			medium: { media: '(max-width: 1024px)', href: '/css/style-medium.css', containers: '85%!' },
			small: { media: '(max-width: 736px)', href: '/css/style-small.css', containers: '90%!', grid: { gutters: ['1.25em', 0] } },
			xsmall: { media: '(max-width: 480px)', href: '/css/style-xsmall.css' }
		},
		plugins: {
			layers: {
				config: {
					mode: 'transform'
				},
				titleBar: {
					breakpoints: 'medium',
					width: '100%',
					height: 44,
					position: 'top-left',
					side: 'top',
					html: '<span class="toggle" data-action="toggleLayer" data-args="sidePanel"></span><span class="title" data-action="copyText" data-args="logo"></span><a href="/" class="avatar"></a>'
				},
				sidePanel: {
					breakpoints: 'medium',
					hidden: true,
					width: { small: 275, medium: '20em' },
					height: '100%',
					animation: 'pushX',
					position: 'top-right',
					side: 'right',
					orientation: 'vertical',
					clickToHide: true,
					html: '<div data-action="moveElement" data-args="header"></div>'
				}
			}
		}
	});

})(jQuery);

$(document).ready(function() {
	// hide/show fixed mobile header
	var $header = $('#titleBar');

    var checkScrollPosition = function() {
        var windowTop = $(window).scrollTop();
        var isPastTop = windowTop > 10;
        var isStuck = $header.hasClass('stuck');

        if( isPastTop && !isStuck ) {
            $header.addClass('stuck');
        } else if( !isPastTop && isStuck ) {
            $header.removeClass('stuck');
        }
    };

    if( $header.length ) {
    	$(window).on('scroll', _.throttle(checkScrollPosition, 16));
    	checkScrollPosition();
    }

    // add console header
    $('.highlight code:not([data-lang])').addClass('console').before('<span class="console-header"><span></span></span>');
});
