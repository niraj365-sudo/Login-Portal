const express = require('express');
const router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcryptjs')

//Route for login
router.get('/login',(req,res)=>{
    res.render('login')
})
//Route for register
router.get('/register',(req,res)=>{
    res.render('register')
})

//Register handle
router.post('/register',async(req,res)=>{
    const {name, email, password, password2}= req.body
    User.findOne({
        email: email
    }).exec(async(err,user)=>{
        if(err){
            res.send('Error!!',err)
        }
        if(user){
            res.send('User already registered.')
        }
        
        
        console.log(req.body);
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
    }

    if (errors.length > 0) {
        return res.render('register',{
            errors,
            name,
            email,
            password,
            password2

        })
        
    } else {

        try {
            const hash_password = await bcrypt.hash(password, 10)
            const user =  new User({
                name: name,
                email: email,
                password: hash_password
            })
            user.save((err,data)=>{
                if(err){
                    throw err;
                }
                console.log(data);
                
            })
            return res.redirect('/users/login')
            
        } catch (error) {
            
            console.log(error);
        }
    }
})
    
})

router.get("/alluser",async(req,res)=>{
    
    try {
        const users = await User.find()
        if(users.length > 0){
            
            res.json({
                AllUsers: users
            })
        }
        res.status(400).json({
            msg: "No users!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong",
            // errormsg: error.errors[0].msg
            errormsg: error
        })
    }
})

//Signin
router.post('/login', async (req,res)=>{
    try {
        User.findOne({
            email: req.body.email
        }).exec( async (err,user)=>{
            if(err){
                throw err;
            }
            if(user){
                const isPassword = await bcrypt.compare(req.body.password, user.password)
                
                console.log(req.body.password);
                console.log(isPassword);
                if (isPassword) {
                    
                  return  res.redirect('/dashboard')
                    
                }
             return   res.send('Password doesnot match')
            }
          return  res.send('User not found')
        })
    } catch (error) {
        res.send('Something went wrong!')
        console.log(error);
    }
   
})


module.exports = router;