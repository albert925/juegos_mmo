var fs=require("fs")
var path=require("path")
var conexion=require("../base_datos")

module.exports.borrmenus=function (id,callback) {
	var reg="DELETE from menu where id_mn="+id
	conexion.getConnection(registro(reg,function (resultado) {
		callback(resultado)
	}))
}
module.exports.borrimgcont=function (id,callback) {
	var reg="SELECT * from images_ct where id_img_ct="+id
	var borr="DELETE from images_ct where id_img_ct="+id
	conexion.getConnection(regisdos(reg,function (rsl,rut) {
		var rutimage=path.join(__dirname,"../..","public/images/contenido/"+rut)
		if (rsl==3) {
			conexion.getConnection(registro(borr,function (resul) {
				fs.unlink(rutimage)
				callback(resul)
			}))
		}
		else{
			callback(rsl)
		}
	}))
}
module.exports.borrcontent=function (id,callback) {
	var sacimg="SELECT * from images_ct where ct_id="+id
	var borr="DELETE from contenido where id_ct="+id
	conexion.getConnection(busimgdell(sacimg,function (result) {
		if (result==3) {
			conexion.getConnection(registro(borr,function (resl) {
				callback(resl)
			}))
		}
		else{
			callback(1)
		}
	}))
}
function registro (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,resquery(function (resultado) {
			callback(resultado)
		}))
	}
}
function resquery (callback) {
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			callback(2)
		}
	}
}
function regisdos (sql,callback) {
	return function (err,conecT) {
		conecT.query(sql,restwory(function (rsl,rut) {
			callback(rsl,rut)
		}))
	}
}
function restwory (callback) {
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				var ruta=result[0].rut_id
				callback(3,ruta)
			}
			else{
				callback(2)
			}
		}
	}
}
function busimgdell (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,resimg(function (result) {
			callback(result)
		}))
	}
}
function resimg (callback) {
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				for (var i = 0; i < result.length; i++) {
					var img=result[i].rut_id
					var rutdosimg=path.join(__dirname,"../..","public/images/contenido/"+img)
					fs.unlink(rutdosimg)
				}
				callback(3)
			}
			else{
				callback(2)
			}
		}
	}
}