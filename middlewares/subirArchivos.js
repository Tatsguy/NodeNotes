var multer = require("multer");
function subirArchivo() {
  const storage = multer.diskStorage({
    destination: "./static/profiles",
    filename: function (req, file, cb) {
      var archivo = file.originalname;
      cb(null, archivo);
    },
  });

  const upload = multer({ storage }).single("fotoPerfil");
  return upload;
}

module.exports = subirArchivo;
