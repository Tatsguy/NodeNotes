var express = require("express");
var session = require("express-session")
var path = require("path");
var userRoutes = require('./routes/users.js');

const app = express()
const PORT = 5000

app.use('/static',express.static(path.join(__dirname,"/static")));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: '69696969',
    resave : true,
    saveUninitialized: true
}))

app.use('/users',userRoutes)
app.get('/',(req,res)=> res.render('index'))
app.get('/Login',(req,res)=> res.render('login'))
app.get('/SignIn',(req,res)=> res.render('sing-in'))

app.listen(PORT,()=>{
    console.log(`Server Running on port: http://localhost:${PORT}`)
})