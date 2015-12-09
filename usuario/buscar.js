var conexion = require("../router/base_datos")

module.exports.general=function (id,callback) {
	var reg="SELECT * from usuarios where id_us="+id;
	conexion.getConnection(busqueduno(reg,function (result) {
		callback(result)
	}))
}
function busqueduno (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,qeruyuno(function (result) {
			callback(result)
		}))
	}
}
function qeruyuno (callback) {
	return function (err,result) {
		if (err) {return console.log(err)}
		if (result.length>0) {
			var spliname=result[0].nam_us.split(" ")
			var nmares=spliname[0]
			var objus={
				name:result[0].nam_us,
				idrd:result[0].id_red
			}
			callback(objus)
		}
		else{
			callback(1)
		}
	}
}