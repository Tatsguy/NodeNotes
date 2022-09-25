const express = require('express');
const router = express.Router();

const conexion = require('./database/db')

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/Administrador',(req,res)=>{
    conexion.query('SELECT * FROM usuarios',(error,results)=>{
        if(error){
            throw error
        }else{
            res.render('administrador',{results:results})
        }
    })
})

router.get('/edit/:id',(req,res)=>{
    const id = req.params.id
    conexion.query('SELECT * FROM usuarios WHERE id=?',[id],(error,results)=>{
        if(error){
            throw error
        }else{
            res.render('editar',{user:results[0]})
        }
    })
})

router.get("/Registro",(req,res)=>{
    res.render("sing-in")
})

router.get("/Notas",(req, res)=>{
    res.render("notas")
})

const crud = require('./controllers/crud')

router.post('/save',crud.save)

router.post('/update',crud.update)


module.exports = router