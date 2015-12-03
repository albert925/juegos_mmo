var $ = require("jquery")
var socketio = require("socket.io-client")
var socket=socketio()
/*
socket.emit("ping")//enviar
	//recibir
	socket.on("pong",function () {
		console.log("pong")
	})
*/
function writeusuario () {
	if (localStorage.users) {
		var user=localStorage.users
	}
	else{
		var user=""
	}
	var html='<input type="text" id="usernm" value="'+user+'" placeholder="nombre de usuario" />'
	html+='<input type="submit" id="ingnm" value="Enviar" />'
	html+='<div id="txA"></div>'
	return html
}
function writemensaje (users) {
	var html='<form action="#">'
		html+='<input type="text" id="mesj" placeholder="Ingrese el mensaje" data-us="'+users+'" />'
		html+='<input type="submit" id="btenv" value="Enviar" data-us="'+users+'" />'
	html+='</form>'
	return html
}
function writcadmsj (users,msj) {
	var html='<div class="cdjms">'
			html+='<div>'
				html+='<b>'+users+':</b> &nbsp;&nbsp;'+msj
			html+='</div>'
	html+='</div>'
	return html
}
module.exports.colocarusers=function () {
	$(".envmsj").html(writeusuario)
}
module.exports.ingreusuario=function (ev) {
	var uss=$("#usernm").val();
	if (uss=="") {
		$("#txA").text("Ingrese el nombre de usuario")
		$("#usernm").focus()
	}
	else{
		$("#txA").text("")
		localStorage.users=uss
		$(".envmsj").html(writemensaje(localStorage.users))
			.fadeIn()
	}
}
module.exports.envmensaje=function (ev) {
	var user=$(this).attr("data-us")
	var mensj=$("#mesj").val()
	socket.emit("mensaje",{us:user,ms:mensj})
	$(".cajaTms").prepend(writcadmsj(user,mensj))
	$(".cdjms:first").animate({width:"100%",padding:"1.5em 0 1.5em 1m"},500)
	$("#mesj").val("")
	return false
}
module.exports.colocarmensajes=function () {
	socket.on("mensaje",function (resms) {
		console.log(resms)
		$(".cajaTms").prepend(writcadmsj(resms.us,resms.ms))
		$(".cdjms:first").animate({width:"100%",padding:"1.5em 0 1.5em 1m"},500)
	})
}