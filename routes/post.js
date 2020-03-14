const express= require('express');
const postControllers= require('../controllers/post')
 
const router = express.Router();
router.get('/',postControllers.getPosts);

router.post('/post',postControllers.createPost);

router.get('/getpost/:id',postControllers.getPostById);

module.exports= router;