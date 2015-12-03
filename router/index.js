var express=require("express")
var admin=require("./administrador")
var archivos=require("./archivos")
var contenido=require("./contenido")

var path=require("path")
var multer=require("multer")

var router=express.Router()

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
router.get("/administrador",function (req,res) {
	archivos.normal(req,res,"admin/admin.html")
})
router.get("/menu",function (req,res) {
	archivos.normal(req,res,"admin/menu.html")
})
router.get("/menu/todos",contenido.mostrartodos)
router.get("/contenido",function (req,res) {
	archivos.normal(req,res,"admin/contenido.html")
})
router.get("/contenido/todos",contenido.mostconttodos)
router.get("/mofcontent/:id",contenido.existerut(function (result,req,res) {
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
router.get("/content-images/:id",contenido.existerut(function (result,req,res) {
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
	res.json(result)
}))

router.post("/mmoadm",admin.ingreso)
router.post("/newmenu/:pla",contenido.menu)
router.post("/mofmenu",contenido.mfmenu)
router.post("/borrar_menu/:id",contenido.menuborrar)
router.post("/newcontenido",contenido.ingresocont)
router.post("/idcont/:id",contenido.colocar)
router.post("/mofconte",contenido.mfcont)
router.post("/borrar_imgcont/:id",contenido.cntigmborrar)
router.post("/borrar_conte/:id",contenido.contborrar)
router.post("/newimagect",upload.single("gimg"),function (req,res) {
	var id=req.body.idr
	var image=req.file.filename
	contenido.imagescont(id,image,function (result) {
		res.json(result)
	})
})

module.exports=router