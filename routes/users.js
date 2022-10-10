var express = require("express");
const router = express.Router();
var { user } = require("../conexion");
var { note } = require("../conexion");
var subirArchivo = require("../middlewares/subirArchivos");

//Todas las rutas aqui comienzan con users

//Metodos par
router.post("/SignUp", async (req, res) => {
  var userForm = {
    nombre: req.body.nombre,
    usuario: req.body.usuario,
    email: req.body.email,
    password: req.body.password,
    rol: 2,
    userStatus:1
  };
  const usuario = await user.findOne({ where: { usuario: userForm.usuario } });
  const email = await user.findOne({ where: { email: userForm.email } });
  if (usuario) {
    res.render("sing-in", { mensaje: "Nombre de usuario ocupado" });
  } else if (email) {
    res.render("sing-in", { mensaje: "Email ya registrado" });
  } else {
    if(req.session.idUser){
      console.log("Eres Admin")
      userForm.rol=req.body.rol
      await user.create(userForm);
      res.redirect("/users/Admin");            
    }else{
      console.log("Bienvenudo")
      await user.create(userForm);
      const usuarioRegistrado = await user.findOne({
        where: { usuario: req.body.usuario },
      });
      req.session.idUser = usuarioRegistrado.idUser
      res.redirect("/users/Notas");
    }
  }
});

router.post("/Login", async (req, res) => {
  const usuario = await user.findOne({
    where: { usuario: req.body.usuario, password: req.body.password },
  });
  if (!usuario) {
    res.render("login", { mensaje: "El usuario o la contraseña no existen" })
  } else {
    if(usuario.userStatus==0){
      res.render("login", { mensaje: "El usuario que ingresaste esta dado de baja" })
    }else{
      req.session.idUser = usuario.idUser
      req.session.rol = usuario.rol
      if(usuario.rol==2) res.redirect("../users/Notas")
      else res.redirect("../users/Admin")
    }
  }
});

router.get("/Notas", async (req, res) => {
  if(req.session.idUser){
    let notas = await note.findAll({ where: { idUser: req.session.idUser } });
    let usuario = await user.findOne({ where: { idUser: req.session.idUser } });
    res.render("notas", { usuario, notas });
  }else{
    res.redirect('../')
  }
});

router.get("/Admin", async (req, res) => {
  if(req.session.idUser){
    if(req.session.rol==1){
      let usuario = await user.findOne({ where: { idUser: req.session.idUser } });     
      let datos = await user.findAll({ where: { userStatus:1 } });   
      let bajas = await user.findAll({ where: { userStatus:0 } }); 
      res.render("administrador", { datos,usuario,bajas});
    }else{
      res.redirect("../users/Notas")
    }
  }else{
    res.redirect('../')
  }
});

router.get("/Cerrar-Sesion",async(req,res)=>{
  req.session.idUser = null;
  req.session.rol = null;
  res.redirect('../')
})

router.get("/Edit/:id", async (req, res) => {
  const usuario = await user.findOne({ where: { idUser: req.params.id } });
  res.render("editar-usuario", { usuario });
});

router.get("/Delete/:id", async (req, res) => {
  await user.destroy({ where: { idUser: req.params.id } });
  res.redirect("../Admin");
});

router.get("/Baja/:id", async (req, res) => {
  await user.update({userStatus:0},{ where: { idUser: req.params.id } });
  res.redirect("../Admin");
});

router.get("/Activar/:id", async (req, res) => {
  await user.update({userStatus:1},{ where: { idUser: req.params.id } });
  res.redirect("../Admin");
});

router.post("/ModificarUser", subirArchivo(), async (req, res) => { //Modificar nuestro propio user
  if (req.file) req.body.fotoPerfil = req.file.originalname;
  await user.update(req.body, { where: { idUser: req.body.idUser } });
  res.redirect("../Notas")
});

router.post("/ModificarAdmin",async (req,res)=>{ //Modificar como administrador
  await user.update(req.body, { where: { idUser: req.body.idUser } });
  res.redirect("../Admin/")
})

router.put("/operacion-notas", async (req, res) => { //Actualizacion/creacion/borrado de notas
  let nota = req.query;
  console.log("conectando con ajax: " + JSON.stringify(nota));
  res.sendStatus(200);

  if (await note.findOne({ where: { idNote: nota.idNote } })) {
    if (nota.idUser == 0) {
      await note.destroy({ where: { idNote: nota.idNote } });
      console.log("Nota destruida");
    } else {
      await note.update(nota, { where: { idNote: nota.idNote } });
      console.log("Nota actualizada");
    }
  } else {
    console.log("Nota creada");
    await note.create(nota);
  }
});

async function loadUser(req, res, next) {
  if (req.params.userId) {
    const usuario = await user.findOne({ where: { idUser: req.params.userId } });
    if(usuario){
        req.user = usuario
        next()
    }else{
        next(new Error("Couldn't find user: " + err));
        return;
    }
  } else {
    next();
  }
}

module.exports = router;
