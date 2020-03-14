const mongoose= require('mongoose');
const data= new mongoose.Schema({
    title: {
type :String,
required: true,
minlength: 10,
maxlength: 100
},
    body :{
type :String,
required :true,
minlength:10,
maxlength:100
}
});

module.exports= mongoose.model("Demo",data);

