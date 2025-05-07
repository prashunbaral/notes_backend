import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes';
import pool from './db/config';
dotenv.config();



const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());
app.use(express.json());



// Routes
app.use('/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 