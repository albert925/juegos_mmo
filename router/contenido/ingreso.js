var conexion=require("../base_datos")
var num=0
var hoy=new Date()
var dia=hoy.getDate()
var mes=hoy.getMonth()
var year=hoy.getFullYear()
var fecha=year+"-"+mes+"-"+dia
module.exports.mening=function (dato,callback) {
	var reg="SELECT * from menu where tt_mn='"+dato+"'"
	var ing="INSERT into menu(tt_mn) values('"+dato+"')"
	conexion.getConnection(registro(reg,function (resultado) {
		if (resultado===2) {
			callback(2)
		}
		else{
			conexion.getConnection(ingresar(ing,function (resuldos) {
				callback(resuldos)
			}))
		}
	}))
}
module.exports.conten=function (a,b,c,callback) {
	var ingreg="INSERT into contenido(mn_id,tt_ct,txt_ct,es_ct,fe_ct) "
	ingreg+="values('"+a+"','"+b+"','"+c+"','"+1+"','"+fecha+"')"
	conexion.getConnection(ingresar(ingreg,function (resultres) {
		callback(resultres)
	}))
}
module.exports.imgcont=function (id,img,callback) {
	var ingr="INSERT into images_ct(ct_id,rut_id) values("+id+",'"+img+"')"
	conexion.getConnection(ingresar(ingr,function (resultcua) {
		callback(resultcua)
	}))
}
function registro(sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(conecT)}
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
			if (result.length>0) {
				callback(2)
			}
			else{
				callback(3)
			}
		}
	}
}
function ingresar (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql)
		callback(3)
	}
}