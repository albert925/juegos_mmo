var conexion=require("../base_datos")
module.exports.tdimgcont=function (id,callback) {
	var reg="SELECT * from images_ct where ct_id="+id+" order by id_img_ct asc"
	conexion.getConnection(buscar(reg,function (resultado) {
		callback(resultado)
	}))
}
function buscar (sql,callback) {
	return function (err,connecT) {
		if (err) {console.log(err)}
		connecT.query(sql,resquery(function (resultado) {
			callback(resultado)
		}))
	}
}
function resquery (callback) {
	var images=new Array()
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				for (var i = 0; i < result.length; i++) {
					var obj={
						idg:result[i].id_img_ct,
						gct:result[i].ct_id,
						rtg:result[i].rut_id
					}
					images.push(obj)
				}
				callback(images)
			}
			else{
				callback(2)
			}
		}
	}
}