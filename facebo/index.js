var express = require("express")
var passport = require("passport")
var facebookStra = require("passport-facebook")
var archivos = require("../router/archivos")

var faceb = express.Router()

passport.use(new facebookStra({
	clientID: FACEBOOK_APP_ID,
	clientSecret: FACEBOOK_APP_SECRET,
	callbackURL: 'http://localhost:3000/auth/facebook/callback',
	enableProof: false
	},
	function (accessToken, refreshToken, profile, done) {
		done(null, profile)
	}
))

passport.serializeUser(function (user,done) {
	done(null, user)
})
passport.deserializeUser(function (user,done) {
	done(null, user)
})

faceb.get("/auth/facebook",passport.authenticate("facebook",{
	successRedirect: "/bienbenido",
	failureRedirect: '/erroface'
}))
faceb.get("/logout",function (req,res) {
	res.logout()
	res.redirect("/chat")
})
faceb.get("/bienbenido",ensureAuth,function (req,res) {
	res.send("bienvenido "+req.users.displayName)
})

function ensureAuth (req,res,next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect("/chat")
}
module.exports = faceb