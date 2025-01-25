const express = require('express');
const HomeController = require('../Controllers/HomeController');

// Create router
const router = express.Router();

// Define home route
router.get('/', HomeController.getHomePage);
router.get('/serve-widget', HomeController.serveWidget);
router.get('/dashboard', HomeController.serveAdminPage);
router.get('/viewer', HomeController.getViewer);

module.exports = router;
