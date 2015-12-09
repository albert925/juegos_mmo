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
function notificaiconsoportado() {
	return (!!window.Notification)
}
module.exports.noticiacion= function (us,msj) {
	Notification.requestPermission();
}

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
function writdosmsj (id,fa,msj) {
	var html='<div id="mj'+id+'" class="cadjms">'
				html+='<div class="avacj">'
					html+='<figure style="background-image:url(https://graph.facebook.com/'+fa+'/picture);"></figure>'
				html+='</div>'
				html+='<div class="texmsj">'
					html+=msj
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
		var opciones={
			body:resms.us+": "+resms.ms,
			icon: "/images/icon.png"
		}
		//console.log(resms)
		$(".cajaTms").prepend(writcadmsj(resms.us,resms.ms))
		$(".cdjms:first").animate({width:"100%",padding:"1.5em 0 1.5em 1m"},500)
		$('<audio src="/audio/sonido.wav" autoplay type="audio/wav"></aduio>').appendTo("body")
		var notif=new Notification("mensaje",opciones)
		if (window.navigator && window.navigator.vibrate) {
			navigator.vibrate (1000)
		}
		//setTimeout(notif.close, 3000);
	})
}
module.exports.obtenerusIngr=function () {
	var urlobt=document.location.href
	var idurl=urlobt.split("/")
	var idrlru=idurl[4].split("#")
	console.log(idrlru[0])
	$(".envmsjred input[type=submit]").attr("data-id",idrlru[0]+"-"+0)
}
module.exports.envmengenprv=function (ev) {
	var idcht=$(this).attr("data-id")
	var geoprv=idcht.split("-")
	var msejpv=$("#msjxx").val()
	if (geoprv[1] == 0 || geoprv[1] == "0") {
		var msjpg=$("#msjxx").val()
		socket.emit("chgen",{id:geoprv[0],ms:msejpv})
		$("#msjxx").val("")
		$("#msjxx").focus()
		return false
	}
	return false
}
module.exports.colocarmensprivado=function () {
	console.log(44)
	socket.on("chgen",function (resms) {
		$(".cjtcms").prepend(writdosmsj(resms.id,resms.idf,resms.mens))
		$('<audio src="/audio/sonido.wav" autoplay type="audio/wav"></aduio>').appendTo("body")
		console.log(resms)
	})
}