import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createUser = async function (req, res) {
  const { username, email, password, role } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
      role,
    });

    const savedUserData = await user.save();

    if (!savedUserData) {
      return res.status(400).json({ message: `Failed to update on database` });
    } else {
      res.status(201).json({ message: `User created Successfully!` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const editUser = async function (req, res) {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    const updateFields = {
      username: user.username,
      password: user.password,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.status(201).json({ message: 'User updated successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const deleteUser = async function (req, res) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    res.status(200).json({ message: `User deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const searchUsers = async function (req, res) {
  const { searchQuery } = req.query;
  let searchCriteria = {};

  if (!searchQuery || searchQuery.trim().length === 0) {
    return res.status(400).json({ error: `Search query is required` });
  }

  const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    searchQuery
  );

  const isRole = ['admin'].includes(searchQuery.toLowerCase());

  if (isEmail) {
    searchCriteria.email = { $regex: searchQuery, $options: 'i' };
  } else if (isRole) {
    searchCriteria.role = searchQuery.toLowerCase();
  } else {
    searchCriteria.username = { $regex: searchQuery, $options: 'i' };
  }

  try {
    const users = await User.find({ ...searchCriteria, isDeleted: false });

    if (users.length === 0) {
      return res.status(404).json({ users });
    }

    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};
