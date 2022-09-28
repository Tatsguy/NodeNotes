var express = require("express");
const { where } = require('sequelize');
const router = express.Router()
var {user} = require("../conexion")

//Todas las rutas aqui comienzan con users
router.get('/',(req,res)=>{
    res.send('Hello')
})

router.post('/Crear',(req,res)=>{
    var userForm = {
        nombre : req.body.nombre,
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol
    }
    user.create(userForm).then(()=>{
        user.findAll
        ({where:{
            usuario:userForm.usuario,
            password:userForm.password
        }})
        .then((datos)=>{
            res.render('notas',{datos})
        })
    }).catch((err)=>{
        console.log(err)
    });
})

router.post('/Login',(req,res)=>{
    user.findAll
    ({where:{
        usuario:req.body.user,
        password:req.body.password
    }})
    .then((datos)=>{
        if(datos.length === 0){
            res.redirect('/')
        }else{
            res.render('notas',{datos})
        }
    })
    .catch((err)=>{
        console.error(err)
    })
})

router.get('/Admin',(req,res)=>{
    user.findAll().then((datos)=>{
        res.render('administrador',{datos})
    })
    .catch((err)=>{
        console.error("Error: "+err);
    })
})

module.exports= router