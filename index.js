var express = require("express");
var rutas = require("./rutas/rutas")
var app = express();
const path = require('path');

app.set('view engine','ejs');
app.use('/',rutas);

app.use('/css',express.static(path.join(__dirname,"/static/css")));
app.use('/images',express.static(path.join(__dirname,"/static/img")));
app.use('/js',express.static(path.join(__dirname,"/static/js")));


app.listen(3000,()=>{
    console.log("Servidor en el puerto 3000");
})