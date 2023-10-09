import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Serve static files from the build directory (your React app)
app.use(express.static(path.join(__dirname, '../client')));

// Define a wildcard route that serves the main HTML file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Hello from DALL.E!' });
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port 8080'))
    } catch (error) {
        console.log(error);
    }
}

startServer();