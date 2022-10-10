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
    secret: "123",
    saveUninitialized: true,
    resave: true,
    cookie:{
      maxAge: 60000,
    }
  }));

app.use('/users',userRoutes)
app.get('/',(req,res)=> res.render('index'))
app.get('/Login',(req,res)=> res.render('login',{mensaje:null}))
app.get('/SignIn',(req,res)=> {
  if(req.session.idUser){
    res.render('sing-in',{mensaje:null,usuario:req.session.idUser})    
  }else{
    res.render('sing-in',{mensaje:null,usuario:null})
  }
})

app.listen(PORT,()=>{
    console.log(`Server Running on port: http://localhost:${PORT}`)
})