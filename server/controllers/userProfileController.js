import User from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

export const profilePage = async function (req, res) {
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  const { email, role, username, profileImage } = user;\
  res.status(200).json({ username, role, id: userId, email, profileImage });
};

export const profileImage = async function (req, res) {
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  const profileImage = user.profileImage;
  if (profileImage) {
    return res.status(200).json({ profileImage });
  }
};

export const uploadProfileImage = async function (req, res) {
  const userId = req.user.userId;

  if (!req.file) {
    return res.status(400).json({ message: `No file uploaded` });
  }

  try {
    const profileImageBuffer = req.file.buffer;
    const contentType = req.file.mimetype;

    if (!['image/jpeg', 'image/png'].includes(contentType)) {
      return res.status(400).json({
        message: 'Invalid image type. Only JPEG and PNG are allowed.',
      });
    }

    if (!profileImageBuffer) {
      return res
        .status(400)
        .json({ message: `Failed to convert image to buffer` });
    }

    const base64Image = profileImageBuffer.toString('base64');
    const base64ImageUrl = `data:${contentType};base64,${base64Image}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { profileImage: base64ImageUrl } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    res.status(200).json({
      message: `Profile image uploaded successfully`,
      profileImage: base64ImageUrl,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal server error, error:${error.message}` });
  }
};

export const logout = async function (req, res) {
  try {
    const userId = req.user.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { refreshToken: '' } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({ message: `Successfully Logged out!` });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const changePassword = async function (req, res) {
  const { newPassword, currentPassword } = req.body;
  const userId = req.user.userId;

  if (!userId) {
    return res.status(404).json({ message: `UserId not found` });
  }

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: `Invalid Credentials` });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: `Failed to update passowrd` });
    }
    
    return res
      .status(200)
      .json({ message: `Password updated successfully`, updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};
