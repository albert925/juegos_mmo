module.exports.loading=function () {
	var load='<center class="loading"><div class="plus-loader"></div></center>'
	return load
}
module.exports.colors=function (dato) {
	var colorh=new Object()
	colorh.mal={color:"#BD2119"}
	colorh.normal={color:"#000"}
	colorh.bien={color:"#023481"}

	return colorh[dato]
}