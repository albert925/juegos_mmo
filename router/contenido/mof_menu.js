var conexion=require("../base_datos")
module.exports.ffmenu=function (id,b,callback) {
	var reg="UPDATE menu set tt_mn='"+b+"' where id_mn="+id
	conexion.getConnection(registro(reg,function (resultado) {
		callback(resultado)
	}))
}
module.exports.ffcontenido=function (obj,callback) {
	var mof="UPDATE contenido set mn_id="+obj.mnr+",tt_ct='"+obj.ttr+"',txt_ct='"+obj.xxr+"' where id_ct="+obj.idr
	conexion.getConnection(registro(mof,function (resultado) {
		callback(resultado)
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