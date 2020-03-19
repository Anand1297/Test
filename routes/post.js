const express= require('express');
const postControllers= require('../controllers/post')
 
const router = express.Router();
//to get all post
router.get('/getpost',postControllers.getPosts);

//to create post
router.post('/post',postControllers.createPost);

//to get post by ID
router.get('/getpost/:id',postControllers.getPostById);

//to update array
router.post('/updateArray',postControllers.updateArray);

//tp add new user
router.post('/Adduser',postControllers.AddUser);

module.exports= router;