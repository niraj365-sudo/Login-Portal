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

//Register handle
router.post('/register',(req,res)=>{
    const {name, email, password, password2}= req.body

    let errors = []

    //Check require fields

    if (!name || !email || !password || !password2) {
        errors.push({msg: "Please fill in all fields."})
    }

    //Check password match
    if (password != password2) {
        errors.push({msg: "Password doesnot match."})
    }
    
    //Check password length
    if (password.length <6) {
        errors.push({msg: "Password should be atleast of 6 characters."})


    if (errors.length > 0) {
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2

        })
        
    } else {
        res.send('pass')
    }
        
    }
})

module.exports = router;