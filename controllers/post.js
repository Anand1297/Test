const Post = require('../models/model');
const createError=require('http-errors');
const mongoose= require('mongoose');

const getPosts=(req,res)=>{
   // res.send("Hello");
   const posts= Post.find({},{_id:0, __v:0})
   .then(posts=>{
       res.send(posts);
     //  res.status(200).json({posts:posts});
   })
    .catch(err =>console.log(err));
};

const createPost= (req,res)=>{
const post = new Post(req.body);
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
    const post=await Post.findById(id);
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
const id= req.body.id;
const result= req.body.marks;
console.log(id+" "+result)

try{
const post=await Post.updateOne({_id:id},{$addToSet:{Subject:[{marks:result}]}})
res.send(post);
}catch(err){
res.send(err);
}

}

module.exports.getPosts=getPosts;
module.exports.createPost= createPost;
module.exports.getPostById=getPostById;
module.exports.updateArray=updateArray;