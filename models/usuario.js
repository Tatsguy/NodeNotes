var sequelize=require('sequelize')
var usuario=(conexion)=>{
    var usuarioSchema = conexion.define('usuario',{
        id:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre:{
            type: sequelize.STRING
        },
        username:{
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
module.exports=usuario