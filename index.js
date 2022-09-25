var express = require("express");
var rutas = require("./router")
var app = express();
const path = require('path');

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
var puerto = process.env.PORT || 3000;
app.use('/',rutas);

app.use('/css',express.static(path.join(__dirname,"/static/css")));
app.use('/images',express.static(path.join(__dirname,"/static/img")));
app.use('/js',express.static(path.join(__dirname,"/static/js")));


app.listen(puerto,()=>{
    console.log(`Servidor en el puerto: ${puerto}`);
})