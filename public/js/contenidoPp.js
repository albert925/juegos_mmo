$(inicio_paginContG)
var loadBb='<center class="loading"><div class="plus-loader"></div></center>'
function inicio_paginContG () {
	var url = document.location.href
	var slaurl = url.split("/")
	var namurl = slaurl[4]
	if (namurl == "" || namurl == undefined) {
		alert("id de menu no disponible")
		console.log(namurl+"-"+slaurl+"-"+url)
	}
	else{
		$("head title").text(namurl+" |Juegos mmorpg")
		$("h1").text(namurl)
		$.get("../contenido-menu/"+namurl,colocarcontmenu)
	}
	$(".conteG").prepend(loadBb)
}
function writeconpaginP (id,tt,xx,fe,es) {
	$(".conteG center").remove()
	$.get("../imgcont/"+id,function (rus) {
		if (es == "1") {
			var html='<article id="arju'+id+'" class="Tcong pC">'
				html+='<figure>'
					html+='<div class="slider-wrapper theme-default">'
						html+='<div id="slider" class="liuu nivoSlider">'
					if (rus == 2) {
						html+='<img src="../images/predeterminado.png" alt="'+tt+id+'" />'
					}
					else{
						for (var i = 0; i < rus.length; i++) {
							html+='<img src="../images/contenido/'+rus[i].rtg+'" alt="'+tt+id+'" />'
						}
					}
						html+='</div>'
					html+='</div>'
				html+='</figure>'
				html+='<figcaption>'
					html+='<div class="texto">'
						html+=xx
					html+='</div>'
					html+='<div class="fecha">'
						html+=fe
					html+='</div>'
				html+='</figcaption>'
			html+='</article>'
			$(".conteG").prepend(html)
			//despues de crear el dom en js se agrega el efecto del plugin
			plgslidsl(id)
		}
	})
}
function colocarcontmenu (res) {
	//console.log(res)
	if (res == "no") {
		$(".conteG center").remove()
		console.log(res)
	}
	else{
		for (var i = 0; i < res.length; i++) {
			var date=res[i].split("-")
			var id=date[0]
			var tt=date[2]
			var xx=date[3]
			var fe=date[5]
			var es=date[4]
			console.log(fe)
			writeconpaginP(id,tt,xx,fe,es)
		}
	}
}
function plgslidsl(id) {
	var $selctor=$(".liuu")
	$selctor.nivoSlider({
		effect: 'boxRainGrow',
		slices: 15,
		boxCols: 8,
		boxRows: 4,
		animSpeed: 500,
		pauseTime: 3000,
		startSlide: 0,
		directionNav: true,
		controlNav: true,
		controlNavThumbs: false,
		pauseOnHover: true,
		manualAdvance: false,
		prevText: 'Prev',
		nextText: 'Next',
		randomStart: false
	})
}