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
	var ruta="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p160x160/12247054_558759300938104_7227626876387297265_n.jpg?oh=06b41d1eb1fbec3faae1354224385dc9&oe=571C325F&__gda__=1461068515_42673149520e4bdf2f426edf1b2ae737"
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
function wriconectados (id,fa,name) {
	var html='<div id="usc_'+id+'" class="ous" data-id="'+id+'" data-fa="'+fa+'" data-nam="'+name+'">'
		html+='<figure style="background-image:url(https://graph.facebook.com/'+fa+'/picture);" title="'+name+'">'
		html+='</figure>'
	html+='</div>'
	return html
}
function agrecajachatpriv (id) {
	var html='<div id="Sec'+id+'" class="cjtcms">'
	html+='</div>'
	return html
}
function agrechathz (id,name) {
	var html='<div id="us'+id+'" class="cambcht" data-id="'+id+'">'+name+'</div>'
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
	//console.log(idrlru[0])
	$(".envmsjred input[type=submit]").attr("data-id",idrlru[0]+"-"+0)
	$("#redicht").attr("data-id",idrlru[0])
	socket.emit("conects",{id:idrlru[0],se:1})
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
	else{
		var salaP="sal-"+geoprv[1]
		socket.emit("join",salaP)
		socket.emit("chpv",{idE:geoprv[1],id:geoprv[0],ms:msejpv})
		$("#msjxx").val("")
		$("#msjxx").focus()
		return false
	}
	return false
}
module.exports.colocarmensprivado=function () {
	socket.on("chgen",function (resms) {
		var $cajachat = $("#Pr")
		//prepend(de abajo arria) addpend(de arriba abajo)
		//$(".cjtcms").prepend(writdosmsj(resms.id,resms.idf,resms.mens))
		$("#Pr").append(writdosmsj(resms.id,resms.idf,resms.mens))
		$("#Pr").animate({scrollTop: $cajachat.get(0).scrollHeight}, 1000)
		$('<audio src="/audio/sonido.wav" autoplay type="audio/wav"></aduio>').appendTo("body")
		console.log(resms)
	})
	socket.on("chpv",function (resmsb) {
		var $cajachat = $("#Sec"+resmsb.ide)
		console.log(resmsb)
		console.log($cajachat)
		$("#Sec"+resmsb.ide).append(writdosmsj(resmsb.id,resmsb.idf,resmsb.mens))
		$("#Sec"+resmsb.ide).animate({scrollTop: $cajachat.get(0).scrollHeight}, 1000)
		$('<audio src="/audio/sonido.wav" autoplay type="audio/wav"></aduio>').appendTo("body")
		console.log(resmsb)
	})
}
module.exports.usersConects=function () {
	mostrarconectados()
}
function mostrarconectados () {
	$.post("/us/td",function (date) {
		for (var icox = 0; icox < date.length; icox++) {
			if (date[icox].conec=="1") {
				if (!$("#usc_"+date[icox].id).length) {
					$(".chatscd").prepend(wriconectados(date[icox].id,date[icox].idf,date[icox].name))
				}
			}
			else{
				$("#usc_"+date[icox].id).remove()
			}
		}
	})
	socket.on("conects",function (us) {
		if (us.se==2) {
			$("#usc_"+us.id).remove()
			$(".flchats #us"+us.id).remove()
		}
		else{
			if(!us == undefined || !us == ""){
				if (!$("#usc_"+us.id).length) {
					console.log(us)
					$(".chatscd").prepend(wriconectados(us.id,us.idf,us.name))
				}
			}
		}
	})
	//con setTImeout al socketio se cuelga el servidor al momento de auntenticarse
	//mas de un usuario y dejar de usar el chat durane 2min
	//setTimeout(mostrarconectados, 1000)
}
module.exports.desconectar=function (e) {
	e.preventDefault()
	var id=$(this).attr("data-id")
	var urds=$(this).attr("href")
	socket.emit("conects",{id:id,se:2})
	window.location.href=urds
}
module.exports.abrirprivado=function () {
	var urlobt=document.location.href
	var idurl=urlobt.split("/")
	var idrlru=idurl[4].split("#")
	var idusv = $(this).attr("data-id")
	var idfav = $(this).attr("data-fa")
	var nachv = $(this).attr("data-nam").split(" ")
	if (idrlru[0]!=idusv) {
		if (!$("#Sec"+idusv).length) {
			$(".conti-msj").prepend(agrecajachatpriv(idusv))
		}
		$(".conti-msj .cjtcms").css({display:"none"})
		$("#Sec"+idusv).css({display:"block"})
		socket.emit("colchat",{id:idusv,fa:idfav,ide:idrlru[0]})
		if (!$("#us"+idusv).length) {
			$(".flchats").append(agrechathz(idusv,nachv[0]))
			$("#btpv").attr("data-id",idrlru[0]+"-"+idusv)
		}
	}
}
module.exports.horizontal=function () {
	var urlobt=document.location.href
	var idurl=urlobt.split("/")
	var idrlru=idurl[4].split("#")
	socket.on("colchat",function (minch) {
		nachv=minch.na.split(" ")
		console.log(minch)
		if (!$("#us"+minch.id).length) {
			if (idrlru[0] == minch.id) {
				if (!$("#Sec"+minch.id).length) {
					$(".conti-msj").prepend(agrecajachatpriv(minch.id))
				}
				$(".flchats").append(agrechathz(minch.id,nachv[0]))
				$("#btpv").attr("data-id",idrlru[0]+"-"+minch.id)
				$(".conti-msj .cjtcms").css({display:"none"})
				$("#Sec"+minch.id).css({display:"block"})
			}
		}
	})
}
module.exports.cambiarsalas=function () {
	var urlobt=document.location.href
	var idurl=urlobt.split("/")
	var idrlru=idurl[4].split("#")
	var ids=$(this).attr("data-id")
	console.log(ids)
	if (ids == "0") {
		$(".conti-msj .cjtcms").css({display:"none"})
		$("#Pr").css({display:"block"})
		$("#btpv").attr("data-id",idrlru[0]+"-"+ids)
	}
	else{
		$(".conti-msj .cjtcms").css({display:"none"})
		$("#Sec"+ids).css({display:"block"})
		$("#btpv").attr("data-id",idrlru[0]+"-"+ids)
	}
}