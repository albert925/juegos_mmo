var path=require("path")
var express=require("express"),http=require("http")
var bodyparse=require("body-parser")
var archivos=require("./router/archivos")
var admin=require("./router")

var app=express()

var servidor=http.createServer(app)

app.use(express.static(path.join(__dirname,"public")))

app.use(bodyparse.urlencoded({extended: false}))
app.use(bodyparse.json())
app.use(admin)

app.get("/",function (req,res) {
	res.render("index.html")
})
app.get("/chat",function (req,res) {
	archivos.normal(req,res,"chat.html")
})


app.listen(3000)
console.log("servidor 3000")