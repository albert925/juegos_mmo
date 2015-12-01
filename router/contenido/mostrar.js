var conexion=require("../base_datos")
module.exports.tods=function (callback) {
	var reg="SELECT * from menu order by id_mn asc"
	conexion.getConnection(buscar(reg,function (resultado) {
		callback(resultado)
	}))
}
module.exports.todcont=function (callback) {
	var reg="SELECT * from contenido order by id_ct asc"
	conexion.getConnection(buscardos(reg,function (resul) {
		callback(resul)
	}))
}
module.exports.exiscont=function (id,callback) {
	var reg="SELECT * from contenido where id_ct="+id
	conexion.getConnection(buscartres(reg,function (resultado) {
		callback(resultado)
	}))
}
module.exports.idcont=function (id,callback) {
	var reg="SELECT * from contenido where id_ct="+id
	conexion.getConnection(buscarcuatro(reg,function (resultado) {
		callback(resultado)
	}))
}
function buscar (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,resquery(function (resultado) {
			callback(resultado)
		}))
	}
}
function resquery (callback) {
	var datos=new Array()
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				for (var i = 0; i < result.length; i++) {
					var id=result[i].id_mn
					var tt=result[i].tt_mn
					var rr=id+"-"+tt
					datos.push(rr)
				}
				callback(datos)
			}
			else{
				callback(2)
			}
		}
	}
}
function buscardos (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,resdosquery(function (resul) {
			callback(resul)
		}))
	}
}
function resdosquery (callback) {
	return function (err,result) {
		var datconten=new Array()
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				for (var i = 0; i < result.length; i++) {
					var id=result[i].id_ct
					var mn=result[i].mn_id
					var tt=result[i].tt_ct
					var xx=result[i].txt_ct
					var es=result[i].es_ct
					var fe=result[i].fe_ct
					var rr=id+"-"+mn+"-"+tt+"-"+xx+"-"+es+"-"+fe
					datconten.push(rr)
				}
				callback(datconten)
			}
			else{
				callback(2)
			}
		}
	}
}
function buscartres (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,resddquy(function (resultado) {
			callback(resultado)
		}))
	}
}
function resddquy (callback) {
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				callback(3)
			}
			else{
				callback(2)
			}
		}
	}
}
function buscarcuatro (sql,callback) {
	return function (err,conecT) {
		if (err) {conosole.log(err)}
		conecT.query(sql,resttquy(function (resultado) {
			callback(resultado)
		}))
	}
}
function resttquy (callback) {
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				var obj={
					idc:result[0].id_ct,
					nmc:result[0].mn_id,
					ttc:result[0].tt_ct,
					xxc:result[0].txt_ct,
					esc:result[0].es_ct,
					fec:result[0].fe_ct
				}
				callback(obj)
			}
			else{
				callback(2)
			}
		}
	}
}