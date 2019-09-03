jQuery(document).ready(function($){
	var $timeline_block = $('.cd-timeline-block');

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(){
		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		$timeline_block.each(function(){
			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
});


$(document).ready(function(e) {



	// $('.with-hover-text, .regular-link').click(function(e) {
	// 	e.stopPropagation();
	// });


	/***************
	 * = Hover text *
	 * Hover text for the last slide
	 ***************/
	// $('.with-hover-text').hover(
	// 	function(e) {
	// 		$(this).css('overflow', 'visible');
	// 		$(this).find('.hover-text')
	// 			.show()
	// 			.css('opacity', 0)
	// 			.delay(200)
	// 			.animate({
	// 					paddingTop: '25px',
	// 					opacity: 1
	// 				},
	// 				'fast',
	// 				'linear'
	// 			);
	// 	},
	// 	function(e) {
	// 		var obj = $(this);
	// 		$(this).find('.hover-text')
	// 			.animate({
	// 					paddingTop: '0',
	// 					opacity: 0
	// 				},
	// 				'fast',
	// 				'linear',
	// 				function() {
	// 					$(this).hide();
	// 					$(obj).css('overflow', 'hidden');
	// 				}
	// 			);
	// 	}
	// );
  //
	// var img_loaded = 0;
	// var j_images = [];


	/* MAPS SECTION BABY */


	var map;
	map = new GMaps({
		div: '#map',
		lat: 36.7130008,
		lng: 10.4031967,
		scrollwheel: false,
		zoom: 14.7,
		zoomControl: true,
		panControl: false,
		streetViewControl: false,
		mapTypeControl: true,
		overviewMapControl: true,
		clickable: true,
	});
	var styles = [

		{
			"featureType": "road",
			elementType: 'geometry',
			"stylers": [{
				"color": "#b4b4b4"
			}]
		}, {
			"featureType": "water",
			"stylers": [{
				"color": "#959ead"
			}]
		}, {
			"featureType": "landscape",
			"stylers": [{
				"color": "#f1f1f1"
			}]
		}, {
			featureType: 'poi.park',
			elementType: 'geometry.fill',
			stylers: [{
				color: '#5b7c66'
			}]
		}, {
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#000000"
			}]
		}, {
			"elementType": "labels.text",
			"stylers": [{
					"saturation": 1
				},
				{
					"weight": 0.1
				},
				{
					"color": "#000000"
				}
			]
		}

	];

	map.addStyle({
		styledMapName: "Styled Map",
		styles: styles,
		mapTypeId: "map_style"
	});

	map.setStyle("map_style");


	var image = 'images/marker.png';

	$('.slide-5').waypoint(function() {

		setTimeout(function() {
			map.addMarker({
				lat: 36.7130008,
				lng: 10.4031967,
				icon: image,
				title: 'Camp\'s Location',

				infoWindow: {
					content: '<h3>#CodingCamp</h3><p>Follow the road to the camp it will take you around 7 minutes</p>'
				},
				animation: google.maps.Animation.DROP,
				verticalAlign: 'bottom',
				horizontalAlign: 'center',
				backgroundColor: '#3e8bff',

			});

		}, 2000);
		setTimeout(function() {
			map.drawRoute({
				origin: [36.7037593, 10.3977398],
				destination: [36.7130008, 10.4031967],
				travelMode: 'driving',
				strokeColor: '#f9d907',
				strokeOpacity: .81,
				strokeWeight: 9
			});

		}, 500);
		setTimeout(function() {
			map.addMarker({
				lat: 36.7037593,
				lng: 10.3977398,
				//icon: image,
				title: 'Train station',

				infoWindow: {
					content: '<h3>Borj Cedria, Train Station</h3><p>You need to take the train from Tunis to Borj Cedria,<br>in order to make it to the camp,<br>Call 50 660 229 if you need help</p>'
				},
				animation: google.maps.Animation.DROP,
			});
		}, 200);

		this.destroy();
	});








	cpt = 0;
	challenger = false;
	$('.btn3d').on('click', function() {

		if (cpt < 6) {
			console.log(cpt);
			new toastr['info'](6 - cpt + ' more clicks to become a challenger !');

		}


		if (cpt === 6) {
			console.log(cpt);
			new toastr['success']('You are now a challenger !');
			new toastr['info']('Opening form link..');

			setTimeout(() => {
				var win = window.open('https://goo.gl/ziFRrz', '_blank');
				if (win) {
					//Browser has allowed it to be opened
					win.focus();
				} else {
					//Browser has blocked it
					alert('Please allow popups for this website');
				}
			}, 500);

			//challenger = true;
		}
		if (cpt > 6) {
			new toastr['success']('You are already a challenger !');
			if (cpt % 3 == 0) {
				var win = window.open('https://goo.gl/ziFRrz', '_blank');
				if (win) {
					//Browser has allowed it to be opened
					win.focus();
				} else {
					//Browser has blocked it
					alert('Please allow popups for this website');
				}
			}
		}
		cpt++;
	})










	/*************************
	 * = Controls active menu *
	 * Hover text for the last slide
	 *************************/


	$(function() {
		var pause = 10;
		$(document).scroll(function(e) {
			delay(function() {

					var tops = [];

					$('.story').each(function(index, element) {
						tops.push($(element).offset().top - 200);
					});

					var scroll_top = $(this).scrollTop();

					var lis = $('.nav > li');

					for (var i = tops.length - 1; i >= 0; i--) {
						if (scroll_top >= tops[i]) {
							menu_focus(lis[i], i + 1);
							break;
						}
					}
				},
				pause);
		});
		//$(document).scroll();
	});
});


var delay = (function() {
	var timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

function menu_focus(element, i) {
	if ($(element).hasClass('active')) {
		if (i == 6) {
			if ($('.navbar').hasClass('inv') == false)
				return;
		} else {
			return;
		}
	}

	enable_arrows(i);

	if (i == 1 || i == 6)
		$('.navbar').removeClass('inv');
	else
		$('.navbar').addClass('inv');

	$('.nav > li').removeClass('active');
	$(element).addClass('active');

	var icon = $(element).find('.icon');

	var left_pos = icon.offset().left - $('.nav').offset().left;
	var el_width = icon.width() + $(element).find('.text').width() + 10;

	$('.active-menu').stop(false, false).animate({
			left: left_pos,
			width: el_width
		},
		1500,
		'easeInOutQuart'
	);
}

function enable_arrows(dataslide) {
	$('#arrows div').addClass('disabled');
	if (dataslide != 1) {
		$('#arrow-up').removeClass('disabled');
	}
	if (dataslide != 8) {
		$('#arrow-down').removeClass('disabled');
	}
}

/******************
 * = Arrows click  *
 ******************/
$('.btn-solo').addClass('btn-clicked');
$('.team-wrapper').addClass("make-visible");


$('.btn-solo').on('click', function(e) {
	$('.btn-solo').addClass("btn-clicked");
	$('.btn-team').removeClass("btn-clicked");
	$('.team-wrapper').addClass("make-visible");
	$('.solo-wrapper').removeClass("make-visible");
	e.preventDefault();
});


$('.btn-team').on('click', function(e) {
	$('.btn-solo').removeClass("btn-clicked");
	$('.btn-team').addClass("btn-clicked");
	$('.team-wrapper').removeClass("make-visible");
	$('.solo-wrapper').addClass("make-visible");
	e.preventDefault();
});

// slide through array my own take on this
//TODO disbale click when button disabled, also fix the scroll index going over the array length
$(document).ready(function($) {


	var sections = ['', '.slide-1', '#slide-2', '#slide-3', '#slide-4', '.slide-5', '#slide-6', '#slide-7'];
	var scrollIndex = 1;

	$('.slide-1').waypoint(function() {
		scrollIndex = 1;
		console.log(scrollIndex);
	}, { offset: -20});

	$('#slide-2').waypoint(function() {
		scrollIndex = 2;
		console.log(scrollIndex);


	}, { offset: -20});
	$('#slide-3').waypoint(function() {
		scrollIndex = 3;
		console.log(scrollIndex);
	});
	$('#slide-4').waypoint(function() {
		scrollIndex = 4;
		console.log(scrollIndex);
	});
	$('#slide-5').waypoint(function() {
		scrollIndex = 5;
		console.log(scrollIndex);
	});
	$('#slide-6').waypoint(function() {
		scrollIndex = 6;
		console.log(scrollIndex);
	});

	$('#arrow-down').click(function() {
		scrollIndex++;
		if (scrollIndex > 6) {
			scrollIndex = 6;
		}

		$(window).scrollTo(sections[scrollIndex], 1000);
		console.log(sections[scrollIndex]);
	});

	$('#arrow-up').click(function() {
		scrollIndex--;
		if (scrollIndex < 1) {
			scrollIndex = 1;
		}
		$(window).scrollTo(sections[scrollIndex], 1000);
		console.log(sections[scrollIndex]);

	});

});

