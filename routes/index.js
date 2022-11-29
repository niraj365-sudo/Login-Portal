const express = require("express");
const router = express.Router();

//router.get('/',(req,res)=>res.render('welcome'))

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/dashboard",(req,res)=>{
  const user = {
    name: "Niraj Paudel"
  }
  res.render("dashboard",{user})
})

module.exports = router;
