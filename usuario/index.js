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