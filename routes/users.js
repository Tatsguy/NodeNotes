var express = require("express");
const router = express.Router()
var {user} = require("../conexion")
var {note} = require("../conexion")

//Todas las rutas aqui comienzan con users

//Que hacer si se trata de entrar desde fuera
router.get('/Crear',(req,res)=>{
    res.redirect("/")
})
router.get('/Login',(req,res)=>{
    res.redirect("/")
})

//Metodos par
router.post('/SignUp',async(req,res)=>{
    var userForm = {
        nombre : req.body.nombre,
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password,
        rol: req.body.rol
    }
    const usuario = await user.findOne({where: {usuario: userForm.usuario}});
    const email = await user.findOne({where: {email: userForm.email}});
    if(usuario){
        res.render('sing-in',{mensaje:"Nombre de usuario ocupado"})
    }else if(email){
        res.render('sing-in',{mensaje:"Email ya registrado"})
    }else{ 
        await user.create(userForm)
        const usuarioRegistrado = await user.findOne({where: {usuario: req.body.usuario}})
        res.redirect('/users/Notas');
    }
})

router.post('/Notas', async(req,res)=>{
    const usuario = await user.findOne({where:{usuario:req.body.user,password:req.body.password}})
    const notas = await note.findAll({where:{idUser:usuario.idUser}})
    res.render('notas',{usuario,notas})
})

router.get('/Admin',(req,res)=>{
    user.findAll().then((datos)=>{
        res.render('administrador',{datos})
    })
    .catch((err)=>{
        console.error("Error: "+err);
    })
})

router.get('/Notas',async(req,res)=>{
    const usuario = {
        idUser :21,
        nombre: "Manolo",
        usuario: "Pepito",
        email: "sofiaaahernanadez70@gmail.com",
        password: "1234",
        rol: 2
    }
    let notas = await note.findAll({ where: {idUser: usuario.idUser}});
    res.render('notas',{usuario,notas});
})

router.get('/Edit/:id', async(req,res)=>{
    const idUsuario=1
    console.log(idUsuario)
    const usuario = await user.findOne({where:{idUser:idUsuario}})
    console.log(usuario)
    res.render('editar-usuario',{usuario})
})

router.put('/operacion-notas', async (req,res) => {
    let nota = req.query;
    console.log('conectando con ajax: '+JSON.stringify(nota));
    res.sendStatus(200); 

    if(await note.findOne({where: {idNote: nota.idNote}})){
        if(nota.idUser == 0){
            await note.destroy({where: {idNote: nota.idNote}});
            console.log('Nota destruida');
        }else{
            await note.update(nota, {where: {idNote: nota.idNote}});
            console.log('Nota actualizada')
        }
    }
    else{
        console.log('Nota creada');
        await note.create(nota);
    }
});

module.exports= router