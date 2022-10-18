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

  
module.exports = router;