var express = require("express");
const router = express.Router();
var { user } = require("../conexion");
var { note } = require("../conexion");
var subirArchivo = require("../middlewares/subirArchivos");

router.get("/MostrarContactos", async (req, res) => {
    let altas = await user.findAll({ where: { userStatus:1 } });   
    let bajas = await user.findAll({ where: { userStatus:0 } }); 
    res.json({altas,bajas});
});

router.post("/Login", async (req, res) => {
    const usuario = await user.findOne({
      where: { usuario: req.body.usuario, password: req.body.password },
    });
    if (!usuario) {
      res.json("Usuario Inexistente")
    } else {
      if(usuario.userStatus==0){
        res.json("Baja")
      }else{
        req.session.idUser = usuario.idUser
        req.session.rol = usuario.rol
        if(usuario.rol==2) res.json("Notas")
        else res.json("Admin")
      }
    }
});

  
module.exports = router;