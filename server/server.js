import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { verifyToken } from './Middleware/authMiddleware.js';

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/', verifyToken, userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log(`Server failed to start on port${PORT}: `, error);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
