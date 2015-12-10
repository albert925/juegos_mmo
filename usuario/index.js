var buscar = require("./buscar.js")

module.exports.datosus=function (id,callback) {
	buscar.general(id,function (result) {
		if (result == 1) {
			callback("Anonimus")
		}
		else{
			callback(result)
		}
	})
}
module.exports.conects=function (callback) {
	buscar.conectados(function (result) {
		callback(result)
	})
}
module.exports.desconect=function (id) {
	buscar.desconectar(id)
}