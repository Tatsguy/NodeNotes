var sequelize = require("sequelize");
var usuarioModelo  = require("./models/usuario")
var notasModelo = require("./models/notas")

var conexion = new sequelize('finalnotes','root','JevG0304',{
    host: 'localhost',
    dialect: 'mysql'
})

conexion.sync({force:false}).then(()=>{
    console.log("Conexión realizada")
})
.catch((err)=>{
    console.error("Error: "+err)
})

var user = usuarioModelo(conexion);
var note = notasModelo(conexion);
module.exports = {user,note}