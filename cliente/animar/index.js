var $ = require("jquery")
module.exports.menu=function () {
	$("#mnV").toggleClass("open")
}
module.exports.caja=function (e) {
	e.preventDefault()
	$(".cajolc").slideToggle("slow")
}
module.exports.header=function (scroll) {
	var alto=$(window).scrollTop()
	if (alto>10) {
		$(".hv").animate({height:"230px"}, 500)
	}
}