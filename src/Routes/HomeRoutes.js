const express = require('express');
const HomeController = require('../Controllers/HomeController');

// Create router
const router = express.Router();

// Define home route
router.get('/', HomeController.getHomePage);

module.exports = router;
