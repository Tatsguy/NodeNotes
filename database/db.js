const mysql = require('mysql2')

const conexion = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'JevG0304',
    database: 'nodenotes'
})

conexion.connect((error)=>{
    if(error){
        console.error('El error de conexión es:'+error)
        return
    }
    console.log('Conectado a la BD MySQL!')
})

module.exports = conexion;