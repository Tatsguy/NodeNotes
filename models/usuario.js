var sequelize = require("sequelize");
var usuarioModelo=(conexion)=>{
    var usuarioSchema = conexion.define('usuarios',{
        idUser:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: sequelize.STRING
        },
        usuario:{
            type: sequelize.STRING
        },
        email:{
            type: sequelize.STRING
        },
        password:{
            type: sequelize.STRING
        },
        rol:{
            type: sequelize.INTEGER
        },
        fotoPerfil:{
            type: sequelize.STRING
        }
    })
    return usuarioSchema
}
module.exports = usuarioModelo