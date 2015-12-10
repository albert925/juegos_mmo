var express = require("express")
var passport = require("passport")
var facebookStra = require("passport-facebook")
var archivos = require("../router/archivos")
var userbd = require("./usuario.js")

var faceb = express.Router()

passport.use(new facebookStra({
	clientID: 903182466456322,
	clientSecret: "3dcacd58bdb6b344a55ea407978dc7a6",
	callbackURL: 'http://localhost:3000/auth/facebook/callback',
	enableProof: false
	},
	function (accessToken, refreshToken, profile, done) {
		userbd.ingresarus(profile.id,profile.displayName,function (datbd) {
			if (datbd != 1 || datbd != 3) {
				var user={
					idb:datbd.idus,
					idf:profile.id,
					prov:profile.provider,
					name:profile.displayName,
					photo:"https://graph.facebook.com/"+profile.id+"/picture"
				}
				done(null, user)
			}
			else{
				done(null, false,{message:"Ocurrio un errror al guardar dato: "+datbd})
			}
		})
	}
))

passport.serializeUser(function (user,done) {
	done(null, user)
})
passport.deserializeUser(function (user,done) {
	done(null, user)
})
faceb.get("/auth/facebook",passport.authenticate("facebook"))
faceb.get("/auth/facebook/callback",passport.authenticate("facebook",{
	successRedirect: "/chat/bienvenido",
	failureRedirect: '/chat/erroface'
}))
faceb.get("/chat/logout",function (req,res) {
	//var usid=req.user.idb
	//userbd.desconectar(usid)
	req.logout()
	res.redirect("/chat")
})
faceb.get("/chat/bienvenido",ensureAuth,function (req,res) {
	var uslk=req.user.idb
	console.log(uslk)
	res.redirect("/chat/"+uslk)
})
faceb.get("/chat/:id",ensureAuth,function (req,res) {
	var idR=req.params.id
	archivos.normal(req,res,"chatauten.html")
})
function ensureAuth (req,res,next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect("/chat")
}
module.exports = faceb