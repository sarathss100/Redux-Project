import User from '../models/User.js';

export const changeRole = async function (req, res) {
  const { role } = req.body;

  if (role !== 'admin' && role !== 'user') {
    return res.status(400).json({ message: `Invalid role.` });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }
    res.status(200).json({ message: `User role updated successfully`, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Internal Server Error : ${error.message}` });
  }
};
