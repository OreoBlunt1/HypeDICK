$(document).ready(function () {
	$('.carousel').slick({
		slidesToShow: 1,
		dots: true,
		customPaging: function (slider, i) {
			// Return your custom dot HTML here
			return '<a><img src="../img/dot.svg" /><img src="../img/active-dot.svg" /></a>';
		},
		arrows: false,
	});
});
