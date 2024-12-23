import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js';

dotenv.config();

export const registerUser = async function (req, res) {
  const { username, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors
        .array()
        .map((error) => error.msg)
        .join(', '),
    });
  }

  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: `User already exists` });
    }

    const isUserNameExist = await User.findOne({ username });
    if (isUserNameExist) {
      return res.status(400).json({ message: `Username already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUserData = await user.save();
    if (!savedUserData) {
      return res.status(400).json({ message: `Failed to update on database` });
    } else {
      const accessToken = generateAccessToken(savedUserData);
      const refreshToken = generateRefreshToken(savedUserData);
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
      await User.updateOne(
        { _id: user._id },
        { $set: { refreshToken: hashedRefreshToken } }
      );
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: `Strict`,
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: `Strict`,
      });
      res.status(201).json({ user });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const loginUser = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `User not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Invalid Credentials` });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await User.updateOne(
      { _id: user._id },
      { $set: { refreshToken: hashedRefreshToken } }
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: `Strict`,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: `Strict`,
    });
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const refreshAccessToken = async function (req, res) {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    return res.status(401).json({ message: `No token, authorization denied` });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      throw new Error();
    }

    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(403).json({
        message: `Refresh token is not valid or has been tampered with`,
      });
    }
    const newAccessToken = generateAccessToken(user);
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: `Strict`,
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: `Token is not valid or expired` });
  }
};
