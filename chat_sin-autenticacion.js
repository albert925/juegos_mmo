//servidor--------------------------------------------------------------------------
var http=require("http")
var path=require("path")
var express=require("express")
var bodyparse=require("body-parser")
var cookieparse=require("cookie-parser")
var session=require("express-session")
var passport=require("passport")
var socketio = require("socket.io")
var archivos=require("./router/archivos")
var admin=require("./router")
var faceb=require("./facebo")
var usuariBD=require("./usuario")
var port = process.env.PORT || 3000

var app=express()

var servidor=http.createServer(app)
var io=socketio(servidor)

app.use(cookieparse())
app.use(session({
	secret:"abcd123zwx098",
	resave:true,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname,"public")))

app.use(bodyparse.urlencoded({extended: false}))
app.use(bodyparse.json())
app.use(admin)
app.use(faceb)

app.get("/",function (req,res) {
	res.render("index.html")
})
app.get("/chat",function (req,res) {
	archivos.normal(req,res,"chat.html")
})

io.on("connection",function (socket) {
	//console.log("conecto "+socket.id)
	socket.on("mensaje",function (msg) {
		socket.broadcast.emit("mensaje",msg)
	})
	socket.on("chgen",function (fas) {
		usuariBD.datosus(fas.id,function (resbd) {
			console.log(fas.id+"-"+fas.ms)
			console.log(resbd.idrd+"-"+fas.ms)
			var mesji={
				id:resbd.idrd,
				mens:fas.ms
			}
			console.log(mesji)
			io.emit("chgen",mesji)
		})
	})
})

servidor.listen(port,function () {
	console.log("servidor en "+port)
})
//-----------------------------------------------------------------------------------
//cliente-----------------------------------------------------------------------------
	//index
var $ = require("jquery")
var animar=require("./animar")
var admin=require("./admin")
var chat = require("./chat")
var contenido=require("./contenido")
var borrarT=require("./borrar.js")

$(inicio_pagina)
function inicio_pagina () {
	$("#men_mv").on("click",animar.menu)
	$("#ingusr").on("click",admin.ingresoadmin)
	$("#mnab").on("click",animar.caja)
	$("#nvmn").on("click",contenido.menu)
	$("#Tmns,#Tcot,#Tcotig").on("click",".dell",borrarT)
	$("#Tmns").on("click",".cambmn",contenido.mofmenu)
	$("#nvct").on("click",contenido.nuevoct)
	$("#nvig").on("click",contenido.subirimage)
	$(".contchat").on("click","#ingnm",chat.ingreusuario)
	$(".contchat").on("click","#btenv",chat.envmensaje)
	$(".envmsjred").on("click","#btpv",chat.envmengenprv)
	$("aduio").remove()
	contenido.colocarmenu()
	if ($("#Tcot").length) {
		contenido.colocarcont()
	}
	if ($(".hscroll").length) {
		$(window).scroll(animar.header)
	}
	if ($(".colmnhr").length) {
		contenido.meunP()
	}
	if ($(".contchat").length) {
		chat.colocarusers()
		chat.colocarmensajes()
	}
	if ($(".contYUchat").length) {
		chat.obtenerusIngr()
	}
	chat.colocarmensprivado()
	chat.noticiacion()
}
//modulocchat---------------------------------------------------------------------
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
		console.log(resms)
	})
}
//--------------------------------------------------------------------------------