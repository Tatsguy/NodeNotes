const conexion = require('../database/db')
// For todays date;
Date.prototype.today = function () { 
    return this.getFullYear()+"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+((this.getDate() < 10)?"0":"") + this.getDate();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
var datetime = new Date().today() + " " + new Date().timeNow();

exports.save=(req,res)=>{
    const nombre=req.body.nombre
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password
    const rol=req.body.rol

    conexion.query('INSERT INTO usuarios SET ?',{nombre,username,email,password,rol,createdAt:datetime,updatedAt:datetime},(error,results)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect('/Notas')
        }
    })
}

exports.update=(req,res)=>{
    const id=req.body.id
    const nombre=req.body.nombre
    const username=req.body.username
    const email=req.body.email
    const password=req.body.password
    const rol=req.body.rol

    conexion.query('UPDATE usuarios SET ? WHERE id=?',[{nombre,username,email,password,rol,updatedAt:datetime},id],(error,results)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect('/Administrador')
        }
    })
}