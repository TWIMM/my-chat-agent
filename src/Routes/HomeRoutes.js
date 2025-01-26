const express = require('express');
const HomeController = require('../Controllers/HomeController');

// Create router
const router = express.Router();

// Define home route
router.get('/', HomeController.getHomePage);
router.get('/serve-widget', HomeController.serveWidget);
router.get('/dashboard', HomeController.serveAdminPage);
router.get('/viewer', HomeController.getViewer);
router.get('/iaagent', HomeController.serveIAAgentPage);
router.get('/businessmodel', HomeController.serveBusinessModeltPage);

module.exports = router;
