var ingresar=require("./ingreso.js")
var mosmenu=require("./mostrar.js")
var mofmenu=require("./mof_menu.js")
var imagesv=require("./images.js")
var borrar=require("./borrar.js")

module.exports.menu=function (req,res) {
	var menu=req.params.pla
	ingresar.mening(menu,function (resultado) {
		res.json({r:resultado})
	})
}
module.exports.mostrartodos=function (req,res) {
	mosmenu.tods(function (resultado) {
		res.json(resultado)
	})
}
module.exports.menuborrar=function (req,res) {
	var id=req.params.id
	borrar.borrmenus(id,function (resultado) {
		res.json({r:resultado,id:id})
	})
}
module.exports.mfmenu=function (req,res) {
	var id=req.body.fa
	var nm=req.body.b
	mofmenu.ffmenu(id,nm,function (resultado) {
		res.json(resultado)
	})
}
module.exports.ingresocont=function (req,res) {
	var mn=req.body.dlmnct
	var tt=req.body.ttct
	var xx=req.body.xxct
	ingresar.conten(mn,tt,xx,function (resultado) {
		if (resultado===3) {
			res.redirect("/contenido")
		}
		else{
			res.json(resultado)
		}
	})
}
module.exports.mostconttodos=function (req,res) {
	mosmenu.todcont(function (resultado) {
		res.json(resultado)
	})
}
module.exports.existerut=function (callback) {
	return function (req,res) {
		var idr=req.params.id
		mosmenu.exiscont(idr,function (result) {
			callback(result,req,res)
		})
	}
}
module.exports.colocar=function (req,res) {
	var id=req.params.id
	mosmenu.idcont(id,function (result) {
		res.json(result)
	})
}
module.exports.mfcont=function (req,res) {
	var obj={
		idr:req.body.idf,
		mnr:req.body.dldodos,
		ttr:req.body.ttct,
		xxr:req.body.xxct
	}
	mofmenu.ffcontenido(obj,function (result) {
		if (result==2) {
			res.redirect("/mofcontent/"+obj.idr)
		}
		else{
			res.format({
				"text/plain":function () {
					res.status(500)
					res.send("ha ocurrido un error")
				}
			})
		}
	})
}
module.exports.colimgcontt=function (req,res) {
	var id=req.params.id
	imagesv.tdimgcont(id,function (result) {
		res.json(result)
	})
}
module.exports.imagescont=function (id,img,callback) {
	ingresar.imgcont(id,img,function (result) {
		callback(result)
	})
}
module.exports.cntigmborrar=function (req,res) {
	var id=req.params.id
	borrar.borrimgcont(id,function (resl) {
		if (resl==null) {
			res.json({r:2,id:id})
		}
		else{
			res.json({r:resl,id:id})
		}
	})
}