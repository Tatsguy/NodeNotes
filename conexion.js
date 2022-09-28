var sequelize = require("sequelize");
var usuarioModelo  = require("./models/usuario")

var conexion = new sequelize('nodeNotes','root','JevG0304',{
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
module.exports = {user}