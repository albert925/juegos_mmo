var mysql=require("mysql")
module.exports=mysql.createPool({
	connectionLimit:100,
	host:"conaxport.com",
	user:"conaxpor_albert",
	password:"skarlet725542",
	database:"conaxpor_mmo",
	port:3306
})
/*module.exports=mysql.createPool({
	connectionLimit:100,
	host:"localhost",
	user:"root",
	password:"",
	database:"mmo",
	port:3306
})*/