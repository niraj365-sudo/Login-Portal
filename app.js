const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const indexRoute = require('./routes/index')
const userRoute = require('./routes/users')
const path = require('path')
const app = express()

PORT = process.env.PORT || 404

//EJS
app.use(expressLayouts)
app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs')

//Routes
app.use('/',indexRoute)
app.use('/user',userRoute)

app.listen(PORT,()=>{
    console.log(`Connected to port ${PORT}`);

})