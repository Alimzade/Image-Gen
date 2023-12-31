import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').post( async (req, res) => {
    try {
      const { prompt } = req.body;
      console.log('Hello');
  
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
  
      const image = response.data[0].b64_json;
  
      res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something wrong!' });
    }
  });

export default router;