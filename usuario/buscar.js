var conexion = require("../router/base_datos")

module.exports.general=function (id,callback) {
	var reg="SELECT * from usuarios where id_us="+id;
	conexion.getConnection(busqueduno(reg,function (result) {
		callback(result)
	}))
}
module.exports.conectados=function (callback) {
	var reg="SELECT * from usuarios order by id_us asc"
	conexion.getConnection(bustodoconect(reg,function (result) {
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
function bustodoconect (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,qerudos(function (result) {
			callback(result)
		}))
	}
}
function qerudos (callback) {
	return function (err,result) {
		var userC = new Array()
		if (err) { return console.log(err)}
		if (result.length>0) {
			for (var i = 0; i < result.length; i++) {
				var datus={
					id:result[i].id_us,
					idf:result[i].id_red,
					name:result[i].nam_us,
					conec:result[i].con_us
				}
				userC.push(datus)
			}
			callback(userC)
		}
		else{
			callback(2)
		}
	}
}