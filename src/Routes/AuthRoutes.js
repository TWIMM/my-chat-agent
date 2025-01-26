const express = require('express');
const AuthController = require('../Controllers/AuthController');

// Create router
const router = express.Router();

// Define home route
router.get('/register', AuthController.getRegisterPage);
router.post('/register-user', AuthController.Register);


module.exports = router;
