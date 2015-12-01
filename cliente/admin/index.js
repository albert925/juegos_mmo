var $ = require("jquery")
var colhtm=require("../colhtm")
module.exports.ingresoadmin=function () {
	var usa=$("#usad").val()
	var usb=$("#psad").val()
	var post=$(this).attr("action")
	if (usa=="") {
		$("#txA").css(colhtm.colors("mal")).text("Ingrese el nombre de usuario")
		$("#usad").focus()
		return false
	}
	else{
		if (usb=="") {
			$("#txA").css(colhtm.colors("mal")).text("Ingrese la contraseña")
			$("#psad").focus()
			return false
		}
		else{
			$("#txA").css(colhtm.colors("normal")).text("")
			$("#txA").prepend(colhtm.loading)
			$.post(post,{a:usa,b:usb},resulting)
			return false
		}
	}
}
function resulting (res) {
	$("#txA center").remove()
	if (res.r==1) {
		$("#txA").css(colhtm.colors("mal")).text("usuario o contraseña incorrectos")
		return false
	}
	else{
		if (res.r==2) {
			$("#txA").prepend(colhtm.loading)
			window.location.href="../administrador"
		}
		else{
			$("#txA").css(colhtm.colors("mal")).html(res)
			return false;
		}
	}
}