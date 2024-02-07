const {userModel} = require('../Model/userModel');
const bcrypt = require('bcryptjs');
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = authenticateUser;
