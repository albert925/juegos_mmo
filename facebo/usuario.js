var conexion = require("../router/base_datos")

module.exports.ingresarus=function (id,usurio,callback) {
	var conect="UPDATE usuarios set con_us='1' where id_red='"+id+"'"
	var existe="SELECT * from usuarios where id_red='"+id+"'"
	var ingresar="INSERT into usuarios(id_red,nam_us,tp_us,	es_us) "
	ingresar+="values('"+id+"','"+usurio+"','1','1')"
	conexion.getConnection(buscar(existe,function (resul) {
		if (resul == 1) {
			conexion.getConnection(ingre(ingresar,function (dosres) {
				if (dosres == 2) {
					conexion.getConnection(buscar(existe,function (tresres) {
						conexion.getConnection(conectar(conect))
						callback(tresres)
					}))
				}
				else{
					callback(3)
				}
			}))
		}
		else{
			conexion.getConnection(conectar(conect))
			callback(resul)
		}
	}))
}
module.exports.desconectar=function (id,callback) {
	var deconect="UPDATE usuarios set con_us='2' where id_us='"+id+"'"
	conexion.getConnection(conectar(deconect))
	callback(2)
}
function buscar (sql,callback) {
	return function (err,coneCT) {
		if (err) {
			return console.log(err)
		}
		coneCT.query(sql,qeryu(function (result) {
			callback(result)
		}))
	}
}
function qeryu (callback) {
	return function (err,result) {
		if (err) {return console.log(err)}
		if (result.length>0) {
			var usuarioS={
				idus:result[0].id_us,
				idre:result[0].id_red,
				nmus:result[0].nam_us,
				cous:result[0].cor_us,
				tpus:result[0].tp_us,
				esus:result[0].es_us,
				feus:result[0].fe_us
			}
			callback(usuarioS)
		}
		else{
			callback(1)
		}
	}
}
function ingre (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql)
		callback(2)
	}
}
function conectar (sql) {
	return function (err ,conecT) {
		if (err) {return console.log(err)}
		conecT.query(sql)
	}
}