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
	console.log("conecto "+socket.id)
	socket.on("conects",function (us) {
		//console.log(us)
		if (us.se == 1) {
			usuariBD.datosus(us.id,function (resus) {
				socket.broadcast.emit("conects",{
					id:us.id,
					se:us.se,
					name:resus.name,
					idf:resus.idrd
				})
			})
		}
		else{
			usuariBD.desconect(us.id)
			socket.broadcast.emit("conects",us)
		}
	})
	socket.on("colchat",function (div) {
		console.log(div)
		usuariBD.datosus(div.ide,function (divus) {
			socket.broadcast.emit("colchat",{
				id:div.id,
				ide:div.ide,
				na:divus.name
			})
		})
	})
	socket.on("mensaje",function (msg) {
		socket.broadcast.emit("mensaje",msg)
	})
	socket.on("join",function (room) {
		console.log(room)
		socket.room = room
		socket.join(room)
	})
	socket.on("chpv",function (pv) {
		usuariBD.datosus(pv.id,function (respv) {
			var mensajeD={
				ide:pv.idE,
				id:pv.id,
				idf:respv.idrd,
				mens:pv.ms
			}
			io.sockets.emit("chpv",mensajeD)
		})
	})
	socket.on("chgen",function (fas) {
		usuariBD.datosus(fas.id,function (resbd) {
			//console.log(fas.id+"-"+fas.ms)
			//console.log(resbd.idrd+"-"+fas.ms)
			var mesji={
				id:fas.id,
				idf:resbd.idrd,
				mens:fas.ms
			}
			io.sockets.emit("chgen",mesji)
		})
	})
})

servidor.listen(port,function () {
	console.log("servidor en "+port)
})