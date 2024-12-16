import { verifyAccessToken } from '../utils/jwt.js';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = function (req, res, next) {
  const accessToken = req.cookies['accessToken'];
  if (!accessToken) {
    return res.status(401).json({ message: `No token, authorization denied` });
  }

  try {
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) throw new Error();
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: `Token is not valid or expired` });
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
