var rutas = require("express").Router();
var {usuario} = require('../conexion')

rutas.get("/",(req, res)=>{
    res.render("index")
})

rutas.get("/Acerca-de",(req, res)=>{
    res.render("acerca-de")
})

rutas.get("/Registro",(req,res)=>{
    res.render("sing-in")
})

rutas.post("/Registrarse",(req, res)=>{
    var usuarioForm = {
        nombre : req.body.nombre,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol
    }
    usuario.create(usuarioForm).then(()=>{
        res.render("notas")
    }).catch((err)=>{
        console.log(err)
    });
})

rutas.get("/Login",(req, res)=>{
    res.render("login")
})

rutas.get("/Notas",(req, res)=>{
    res.render("notas")
})

rutas.get("/MostrarUsuarios",async (req,res)=>{
    let tablaUsuarios= JSON.stringify(await usuario.findAll())
    res.render("administrador",{
        tablaUsuarios
    });
})

module.exports=rutas;