var sequelize = require("sequelize");
var notasModelo=(conexion)=>{
    var notasSchema = conexion.define('notas',{
        idNote:{
            type: sequelize.INTEGER,
            primaryKey: true
        },
        contenido:{
            type: sequelize.STRING
        },
        color:{
            type: sequelize.STRING
        },
        fondo:{
            type: sequelize.STRING
        },
        idUser:{
            type: sequelize.INTEGER
        }
    })
    return notasSchema
}
module.exports = notasModelo