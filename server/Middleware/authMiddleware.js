import { verifyAccessToken, verifyRefreshToken } from '../utils/jwt.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async function (req, res, next) {
  const accessToken = req.cookies['accessToken'];

  if (!accessToken) {
    return res.status(401).json({ message: `No token, authorization denied` });
  }

  const decoded = jwt.decode(accessToken);
  const userId = decoded.userId;
  req.user = decoded;
  if (!userId) {
    return res
      .status(401)
      .json({ message: `Invalid token, authorization denied` });
  }

  try {
    const user = await User.findOne({ _id: userId });
    const isValidToken = verifyAccessToken(accessToken);
    if (!isValidToken) {
      const isRefreshTokenVerified = verifyRefreshToken(user.refreshToken);
      if (isRefreshTokenVerified) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await User.findByIdAndUpdate(
          { _id: userId },
          { $set: { refreshToken } }
        );
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: `Strict`,
        });
      } else {
        throw new Error(`verificaion failed`);
      }
    }
    next();
  } catch (error) {
    console.error(`Can't find out the user`);
  }
};

export const isAdmin = function (req, res, next) {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: `Access denied. You do not have admin privileges.` });
  }
  next();
};
