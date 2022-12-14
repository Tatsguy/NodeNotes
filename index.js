var express = require("express");
var cors = require('cors')
var session = require("express-session")
var path = require("path");
var userRoutes = require('./routes/users.js')
var apiNotes = require('./routes/apiNotes.js')
const app = express()
const PORT = 5000

app.use(cors())
app.use('/static',express.static(path.join(__dirname,"/static")));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: "123",
    saveUninitialized: true,
    resave: true
  }));

app.use('/users',userRoutes)
app.use('/api',apiNotes)

app.get('/',(req,res)=> res.render('index'))
app.get('/Acercade',(req,res)=> res.render('acerca-de'))
app.get('/Login',(req,res)=> res.render('login',{mensaje:null}))
app.get('/SignIn',(req,res)=> {
    res.render('sing-in',{mensaje:null})
})

app.listen(PORT,()=>{
    console.log(`Server Running on port: http://localhost:${PORT}`)
})