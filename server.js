const express = require('express');
const postRoute= require('./routes/post');
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const bodyparser= require('body-parser');
const createError=require('http-errors');

dotenv.config();
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true , useUnifiedTopology: true })
.then(()=>{console.log("DB connected")});


mongoose.connection.on("error",err=>{
    console.log(`DB connection error: ${err.message}`);
});

const app= express();
app.use(bodyparser.json());
app.use('/',postRoute);

app.use((req,res,next)=>{
next(createError(404, "Page not Found"));
});

app.use((err,req,res,next)=>{
res.status(err.status || 500);
res.send({
    error:{
        status: err.status || 500,
        message: err.message
    }
});
});
const port= process.env.PORT || 8080;
app.listen(port ,()=>{console.log(`Server started on port ${port}`)});