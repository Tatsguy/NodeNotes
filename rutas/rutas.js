var rutas = require("express").Router();

rutas.get("/",(req, res)=>{
    res.render("index")
})

rutas.get("/Acerca-de",(req, res)=>{
    res.render("acerca-de")
})

rutas.get("/Registrarse",(req, res)=>{
    res.render("sing-in")
})

rutas.get("/Login",(req, res)=>{
    res.render("login")
})

rutas.post("/Notas",(req, res)=>{
    res.render("notas")
})

module.exports=rutas;