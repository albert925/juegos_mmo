var $ = require("jquery")
var colhtm=require("../colhtm")

function writehtml (id,name) {
	var html='<article id="caj'+id+'" class="columinput">'
		html+='<input type="text" id="fmen'+id+'" value="'+name+'" />'
		html+='<div id="txB_'+id+'"></div>'
		html+='<input type="submit" value="modificar" class="cambmn" data-id="'+id+'" />'
		html+='<a class="dell" data-id="'+id+'" href="/borrar_menu">borrar</a>'
	html+='</article>'
	return html
}
function writeslect (id,name) {
	var html='<option value="'+id+'">'+name+'</option>'
	return html
}
function writecontadm (id,tt) {
	var html='<figure id="caj'+id+'">'
		html+='<h2>'+tt+'</h2>'
		html+='<img src="images/predeterminado.png" alt="'+tt+'" />'
		html+='<figcaption class="columinput">'
			html+='<a id="dsea" href="/mofcontent/'+id+'">Modificar</a>'
			html+='<a id="dsea" href="/content-images/'+id+'">Imágenes</a>'
			html+='<a class="dell" data-id="'+id+'" href="/borrar_conte">borrar</a>'
		html+='</figcaption>'
	html+='</figure>'
	return html
}
function es_imagen (tipederf) {
	switch(tipederf.toLowerCase()){
		case 'jpg':
			return true;
			break;
		case 'gif':
			return true;
			break;
		case 'png':
			return true;
			break;
		case 'jpeg':
			return true;
			break;
		default:
			return false;
			break;
	}
}

module.exports.menu=function () {
	var mn=$("#mnnv").val()
	var yu=$(this).parent().attr("action")
	if (mn=="") {
		$("#txA").css(colhtm.colors("mal")).text("Ingrese el nombre")
		return false
	}
	else{
		$("#txA").css(colhtm.colors("normal")).text("")
		$("#txA").prepend(colhtm.loading)
		$.post(yu+"/"+mn,resulmenu)
		return false
	}
}
module.exports.colocarmenu=function () {
	$.get("/menu/todos",mostrarmenus)
}
module.exports.colocarcont=function () {
	$.get("/contenido/todos",mostrarcontenido)
}
module.exports.nuevoct=function () {
	var cta=$("#dlmnct").val()
	var ctb=$("#ttct").val()
	var ctc=$(".xxct").val()
	console.log(cta+"-"+ctb+"-"+ctc)
	var pourl=$("#newform").attr("action")
	if (cta=="0" || cta=="") {
		$("#txA").css(colhtm.colors("mal")).text("Selecione el menu")
		return false
	}
	else{
		if (ctb=="") {
			$("#txA").css(colhtm.colors("mal")).text("ingrese el titulo")
			return false
		}
		else{
			$("#txA").css(colhtm.colors("normal")).text("")
			$("#txA").prepend(colhtm.loading)
			return true
		}
	}
}
module.exports.mofmenu=function () {
	var ida=$(this).attr("data-id")
	var nmF=$("#fmen"+ida).val()
	$("#txB_"+ida).fadeIn()
	if (nmF=="") {
		$("#txB_"+ida).css(colhtm.colors("mal")).text("Ingrese el nombre")
	}
	else{
		$("#txB_"+ida).css(colhtm.colors("normal")).text("")
		$("#txB_"+ida).prepend(colhtm.loading)
		$.post("/mofmenu",{fa:ida,b:nmF},function (res) {
			$("#txB_"+ida+" center").remove()
			if (res==2) {
				$("#txB_"+ida).css(colhtm.colors("bien")).text("Modificado")
				$("#txB_"+ida).fadeOut()
			}
			else{
				console.log(res)
			}
		})
	}
}
module.exports.subirimage=function () {
	var idob=$("#idr").val()
	var urlig=$("#imgct").attr("action")
	var ctimg=$("#gimg")[0].files[0]
	var namectimg=ctimg.name;
	var extectimg=namectimg.substring(namectimg.lastIndexOf('.')+1);
	var tamctimg=ctimg.size;
	var tipoctimg=ctimg.type;
	if (idob=="") {
		$("#txA").css(colhtm.colors("mal")).text("Id de contenido no disponible")
		return false
	}
	else{
		if (!es_imagen(extectimg)) {
			$("#txA").css(colhtm.colors("mal")).text("tipo de imagen no permitido")
			return false
		}
		else{
			$("#txA").css(colhtm.colors("normal")).text("")
			var formu=new FormData($("#imgct")[0])
			$.ajax({
				url: urlig,
				type: 'POST',
				data: formu,
				cache: false,
				contentType: false,
				processData: false,
				beforeSend:function () {
					$("#txA").prepend(colhtm.loading)
				},
				success:relimgcont,
				error:function () {
					$("#txA").css(colhtm.colors("mal")).text("Ocurrió un error");
					$("#txA").fadeIn();$("#txA").fadeOut(3000);
				}
			})
			return false
		}
	}
}
function resulmenu (res) {
	$("#txA center").remove()
	if (res.r==2) {
		$("#txA").css(colhtm.colors("mal")).text("El nombre del menú ya existe")
		return false
	}
	else{
		if (res.r==3) {
			$("txA").css(colhtm.colors("bien")).text("Ingresado")
			location.reload(20)
		}
		else{
			$("#txA").css(colhtm.colors("mal")).html(res)
			return false;
		}
	}
}
function mostrarmenus (res) {
	for (var i = 0; i < res.length; i++) {
		var date=res[i].split("-")
		var id=date[0]
		var name=date[1]
		var article=writehtml(id,name)
		var $article=$(article).show("slow",duracion)
		$(".Tmns").prepend(article)
		$("#dlmnct").append(writeslect(id,name))
	}
}
function duracion () {
	duration:5000
}
function rsingconteni (res) {
	console.log(res)
}
function mostrarcontenido (res) {
	if (res==2) {
		$("#Tcot").text("no hay datos")
	}
	else{
		for (var i = 0; i < res.length; i++) {
			var date=res[i].split("-")
			var id=date[0]
			var tt=date[2]
			var article=writecontadm(id,tt)
			var $article=$(article).show("slow",duracion)
			$(".Tconte").prepend(article)
		}
	}
}
function relimgcont (res) {
	if (res==3) {
		$("#txA").css(colhtm.colors("bien")).text("Imagen subida")
		location.reload(20)
	}
	else{
		console.log(res)
	}
}
function mostrarimgcont (res) {
	// body...
}