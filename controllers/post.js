const Post = require('../models/model');
const createError=require('http-errors');
const mongoose= require('mongoose');

const getPosts=(req,res)=>{
   // res.send("Hello");
   const posts= Post.post.find({},{_id:0, __v:0})
   .then(posts=>{
       res.send(posts);
      //res.status(200).json({posts:posts});
   })
    .catch(err =>console.log(err));
};

const createPost= (req,res)=>{
const post = new Post.post(req.body);
console.log(post);
post.save((err,result)=>{
if(err){
    return res.status(400).json({
        error:err
    })
}
res.status(200).json({
    post:result
})
})
};

const getPostById= async (req,res,next)=>{
    const id= req.params.id;
    try{
    const post=await Post.post.findById(id).populate("id");
    if(!post){
        throw createError(404,"Post not Found");
    }
res.send(post);
} catch(err){
    //console.log(err.message);
    if(err instanceof mongoose.CastError){
        next(createError(404,"Invalid Id"));
        return;
    }
    next(err); 
};
};

const updateArray= async(req,res,next)=>{
try{
const id= req.body.id;
const result= req.body.marks;
console.log(id+" "+result);
const post=await Post.post.findOneAndUpdate({id:id},{$addToSet:{Subject:[{marks:result}]}},{new:true});
res.send(post);
}catch(err){
res.send(err.message);
}
}

const AddUser=async (req,res,next)=>{
    try{
const newUser= new Post.user(req.body);
const result=await newUser.save();
//const id={"id":result._id};
res.send(result);
    }catch(error){
        console.log(error.message);
    }
}

module.exports.getPosts=getPosts;
module.exports.createPost= createPost;
module.exports.getPostById=getPostById;
module.exports.updateArray=updateArray;
module.exports.AddUser=AddUser;