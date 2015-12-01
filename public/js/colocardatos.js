$(inicio_adminSeg)
function inicio_adminSeg () {
	var url=document.location.href
	var uslsoi=url.split("/")
	var idurl=uslsoi[4]
	if (idurl=="" || idurl==undefined) {
		alert("id de contenido no disponible")
	}
	else{
		$.post("/idcont/"+idurl,colcardatosobt)
		$.get("/imgcont/"+idurl,colocarimages)
		$("#idr").val(idurl)
	}
}
function colcardatosobt (rus) {
	if (rus==2) {
		alert("ocurrio un error")
		console.log(2)
	}
	else{
		$("h1").text(rus.ttc)
		$("#colval #idf").val(rus.idc)
		$("#colval #ttct").val(rus.ttc)
		$("#colval .xxct").val(rus.xxc)
		$.get("/menu/todos",function (res) {
			for (var i = 0; i < res.length; i++) {
				var date=res[i].split("-")
				var id=date[0]
				var name=date[1]
				$("#dldodos").append(writeslect(id,name,rus.nmc))
			}
		})
	}
}
function writeslect (id,name,od) {
	var html
	if (od==id) {
		html='<option value="'+id+'" selected>'+name+'</option>'
	}
	else{
		html='<option value="'+id+'">'+name+'</option>'
	}
	return html
}
function colocarimages (ras) {
	$(".Tiamges").prepend('<center class="loading"><div class="plus-loader"></div></center>')
	for (var i = 0; i < ras.length; i++) {
		var id=ras[i].idg
		var file=ras[i].rtg
		$(".Tiamges").prepend(writeimgctadm(id,file))
	}
	$(".Tiamges center").remove()
}
function writeimgctadm (id,img) {
	var html='<figure id="caj'+id+'">'
		html+='<img src="../images/contenido/'+img+'" alt="imagen'+id+'" />'
		html+='<figcaption class="columinput">'
			html+='<a class="dell" data-id="'+id+'" href="/borrar_imgcont">borrar</a>'
		html+='</figcaption>'
	html+='</figure>'
	return html
}