var $ = require("jquery")
var animar=require("./animar")
var admin=require("./admin")
var contenido=require("./contenido")
var borrarT=require("./borrar.js")
$(inicio_pagina)
function inicio_pagina () {
	$("#men_mv").on("click",animar.menu)
	$("#ingusr").on("click",admin.ingresoadmin)
	$("#mnab").on("click",animar.caja)
	$("#nvmn").on("click",contenido.menu)
	$("#Tmns,#Tcot,#Tcotig").on("click",".dell",borrarT)
	$("#Tmns").on("click",".cambmn",contenido.mofmenu)
	$("#nvct").on("click",contenido.nuevoct)
	$("#nvig").on("click",contenido.subirimage)
	contenido.colocarmenu()
	contenido.colocarcont()
}