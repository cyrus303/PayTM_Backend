const express = require('express');
const router = express.Router();
const authenticateUser = require('../Middleware/authenticateUser');
const accountController = require('../Controllers/accountController');

router.get(
  '/balance',
  authenticateUser,
  accountController.balanceCheck
);

router.post(
  '/transfer',
  authenticateUser,
  accountController.transferAmount
);

module.exports = router;
