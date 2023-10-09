import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async(req,res) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' })
    }
});

router.route('/').post(async(req,res) => {
    try {
        const { name, prompt, photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
    
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })
    
        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' })
    }
});

// Route for deleting the post by its id
router.route('/:postId').delete(async (req, res) => {
    const postId = req.params.postId;
  
    try {
      // Find and delete the post by _id
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ success: false, message: 'Post not found for deletion' });
      }
  
      res.status(200).json({ success: true, message: 'Post deleted successfully', data: deletedPost });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Unable to delete the post, please try again' });
    }
  });

export default router;