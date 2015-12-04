var sha1=require("sha1")
var md5=require("md5")
var archivos=require("../archivos")
var conexion=require("../base_datos")
module.exports.val=function (req,res,a,b) {
	var salt="sanae-pequena-nina-7-years$/"
	var pass=sha1(md5(salt+b))
	var reg="SELECT * from administrador where user_adm='"+a+"' and pass_adm='"+pass+"'"
	conexion.getConnection(function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(reg,resquery(res))
	})
}
module.exports.valpasst=function (user,contr,callback) {
	console.log(user+"-"+contr)
	var salt="sanae-pequena-nina-7-years$/"
	var pass=sha1(md5(salt+contr))
	var reg="SELECT * from administrador where user_adm='"+user+"' and pass_adm='"+pass+"'"
	conexion.getConnection(busqueda(reg,function (result) {
		callback(result)
	}))
}
function resquery (res) {
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				var noex=result[0].id_adm
				res.json({r:2})
			}
			else{
				var noex="usuario o contraseña incorrectos"
				res.json({r:1})
			}
		}
	}
}
function busqueda (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,resquerotr(function (result) {
			callback(result)
		}))
	}
}
function resquerotr (callback) {
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				var obj={
					idad:result[0].id_adm,
					usad:result[0].user_adm,
					tpad:result[0].tp_adm
				}
				callback(obj)
			}
			else{
				callback(1)
			}
		}
	}
}