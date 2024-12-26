import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
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

      await User.updateOne({ _id: user._id }, { $set: { refreshToken } });

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: `Strict`,
      });

      res.status(201).json({ user: { id: user.id, role: user.role } });
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

    await User.updateOne({ _id: user._id }, { $set: { refreshToken } });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: `Strict`,
    });

    res.status(201).json({ user: { id: user.id, role: user.role } });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};
