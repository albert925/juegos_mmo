var express=require("express")
var passport=require("passport")
var LocalStrategy = require('passport-local').Strategy
var admin=require("./administrador")
var archivos=require("./archivos")
var contenido=require("./contenido")

var path=require("path")
var multer=require("multer")

var router=express.Router()

//le passport por obligatoriamente en el formulario name debe estar con username
//y password para que lo tome y lo valide aca en el servidor
//con los mismos parámertros
passport.use(new LocalStrategy(function (username,password,done) {
	admin.ingresoPasst(username,password,function (result) {
		if (result=="1") {
			done(null, false,{message:"Usuario o contraseña incorrectos"})
		}
		else{
			done(null,{idad:result.idad,usad:result.user_adm,tpad:result.tp_adm})
		}
	})
}))
passport.serializeUser(function (user,done) {
	done(null,user)
})
passport.deserializeUser(function (user,done) {
	done(null,user)
})

var rutimage=path.join(__dirname,"..","public/images/contenido/")

var storage=multer.diskStorage({
	destination:function (res,file,cb) {
		cb(null,rutimage)
	},
	filename:function (res,file,cb) {
		cb(null,Date.now()+file.originalname)
	}
})
var upload=multer({storage:storage})

router.get("/mmoadm",function (req,res) {
	archivos.normal(req,res,"admin/index.html")
})
router.get("/mmoerr",function (req,res) {
	archivos.normal(req,res,"admin/error1.html")
})
router.get("/sescad",function (req,res) {
	archivos.normal(req,res,"admin/error2.html")
})
router.get("/administrador",ensureAuth,function (req,res) {
	var idad=req.user.idad
	console.log("//"+idad)
	archivos.normal(req,res,"admin/admin.html")
})
router.get("/menu",ensureAuth,function (req,res) {
	archivos.normal(req,res,"admin/menu.html")
})
router.get("/menu/todos",contenido.mostrartodos)
router.get("/contenido",ensureAuth,function (req,res) {
	archivos.normal(req,res,"admin/contenido.html")
})
router.get("/contenido/todos",contenido.mostconttodos)
router.get("/mofcontent/:id",ensureAuth,contenido.existerut(function (result,req,res) {
	if (result==2) {
		res.redirect("/contenido")
	}
	else{
		if (result==3) {
			archivos.normal(req,res,"admin/mof_content.html")
		}
		else{
			console.log(result+"-"+res)
			res.format({
				"text/plain":function () {
					res.status(500)
					res.send("ha ocurrido un error")
				}
			})
		}
	}
}))
router.get("/content-images/:id",ensureAuth,contenido.existerut(function (result,req,res) {
	if (result==2) {
		res.redirect("/contenido")
	}
	else{
		if (result==3) {
			archivos.normal(req,res,"admin/imagesconte.html")
		}
		else{
			console.log(result+"-"+res)
			res.format({
				"text/plain":function () {
					res.status(500)
					res.send("ha ocurrido un error")
				}
			})
		}
	}
}))
router.get("/imgcont/:id",contenido.colimgcontt)
router.get("/primimgct/:id",contenido.primerimgcont)
router.get("/juego/:name",contenido.nammenuexist(function (result,req,res) {
	if (result == 1) {
		res.format({
			"text/plain":function () {
				res.status(400)
				res.send("El contenido no existe")
			}
		})
	}
	else{
		if (result == 2) {
			archivos.normal(req,res,"cont/index.html")
		}
		else{
			res.format({
				"text/plain":function () {
					res.status(500)
					res.send("ha ocurrido un error '"+result)
				}
			})
		}
	}
}))
router.get("/contenido-menu/:name",contenido.nammenu)

router.get("/logout",function (req,res) {
	req.logout()
	res.redirect("/mmoadm")
})
router.post("/login",passport.authenticate("local",{
	successRedirect:"/administrador",
	failureRedirect:"/mmoerr"
}))

router.post("/newmenu/:pla",ensureAuth,contenido.menu)
router.post("/mofmenu",ensureAuth,contenido.mfmenu)
router.post("/borrar_menu/:id",ensureAuth,contenido.menuborrar)
router.post("/newcontenido",ensureAuth,contenido.ingresocont)
router.post("/idcont/:id",contenido.colocar)
router.post("/mofconte",ensureAuth,contenido.mfcont)
router.post("/borrar_imgcont/:id",ensureAuth,contenido.cntigmborrar)
router.post("/borrar_conte/:id",ensureAuth,contenido.contborrar)
router.post("/newimagect",upload.single("gimg"),function (req,res) {
	var id=req.body.idr
	var image=req.file.filename
	contenido.imagescont(id,image,function (result) {
		res.json(result)
	})
})

//Autenticacion si no ha hecho login no lo lleve a la ruta y lo
//devuelve a la ruta de ingreso con isAuthenticated()
function ensureAuth (req,res,next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect("/sescad")
}

module.exports=router