const mongoose= require('mongoose');
const data= new mongoose.Schema({
    title: {
type :String,
minlength: 10,
maxlength: 100
},
    body :{
type :String,
minlength:10,
maxlength:100
},
Subject:[{marks:{type:Number}}],
id:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

const user= new mongoose.Schema({
 name:{type:String},
 phone:{type:Number}   
});

module.exports.post= mongoose.model("Demo",data);
module.exports.user=mongoose.model("User",user);
