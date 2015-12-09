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