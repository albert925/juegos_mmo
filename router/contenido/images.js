var conexion=require("../base_datos")
module.exports.tdimgcont=function (id,callback) {
	var reg="SELECT * from images_ct where ct_id="+id+" order by id_img_ct desc"
	conexion.getConnection(buscar(reg,function (resultado) {
		callback(resultado)
	}))
}
module.exports.imgprimer=function (idct,callback) {
	var reg="SELECT * from images_ct where ct_id="+idct+" order by id_img_ct asc limit 1"
	conexion.getConnection(busdos(reg,function (resultado) {
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
function busdos (sql,callback) {
	return function (err,conecT) {
		if (err) {console.log(err)}
		conecT.query(sql,reswory(function (resl) {
			callback(resl)
		}))
	}
}
function reswory (callback) {
	return function (err,result) {
		if (err) {
			console.log(err)
		}
		else{
			if (result.length>0) {
				var img=result[0].rut_id
				callback(img)
			}
			else{
				callback(2)
			}
		}
	}
}