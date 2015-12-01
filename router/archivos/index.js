var path=require("path");

module.exports.normal=function (req,res,name) {
	var file=path.join(__dirname,"../..","public/"+name)
	res.sendFile(file)
}
module.exports.condatos=function (req,res,name,date) {
	var file=path.join(__dirname,"../..","public/"+name)
	res.sendFile(file,{a:date})
}