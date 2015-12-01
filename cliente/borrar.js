var $ = require("jquery")
module.exports=function (evef) {
	evef.preventDefault()
	var id=$(this).attr("data-id")
	var url=$(this).attr("href")
	var br=confirm("Esta seguro de eliminarlo?")
	if (br==true) {
		$.post(url+"/"+id,resultadoborrado)
	}
}
function resultadoborrado (ress) {
	if (ress.r==2) {
		$("#caj"+ress.id).animate({width:"0",height:"0"}, 100,function () {
			$("#caj"+ress.id).remove()
		})
		console.log(ress)
	}
	else{
		console.log(ress)
	}
}