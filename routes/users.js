const express = require('express');
const router = express.Router();

//Route for login
router.get('/login',(req,res)=>{
    res.render('login')
})
//Route for register
router.get('/register',(req,res)=>{
    res.render('register')
})


module.exports = router;