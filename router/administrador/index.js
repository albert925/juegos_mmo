var validacion=require("./validar.js")


module.exports.ingreso=function (req,res) {
	var user=req.body.a
	var pass=req.body.b
	validacion.val(req,res,user,pass)
}
module.exports.ingresoPasst=function (user,pass,callback) {
	validacion.valpasst(user,pass,function (result) {
		//console.log("))="+result)
		callback(result)
	})
}