var $ = require("jquery")
module.exports.menu=function () {
	$("#mnV").toggleClass("open")
}
module.exports.caja=function (e) {
	e.preventDefault()
	$(".cajolc").slideToggle("slow")
}