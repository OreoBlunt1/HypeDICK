$(document).ready(function () {
	$('.carousel').slick({
		slidesToShow: 1,
		dots: true,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		customPaging: function (slider, i) {
			// Return your custom dot HTML here
			return '<a><img src="../img/dot.svg" /><img src="../img/active-dot.svg" /></a>';
		},
		arrows: false,
	});
});
