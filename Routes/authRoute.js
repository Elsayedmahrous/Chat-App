const express = require('express');

const { signUp , loginUser } = require('../Services/authService')

const router = express.Router();
router.route('/sign-up').post(signUp);
router.route('/login').post(loginUser);

module.exports = router;