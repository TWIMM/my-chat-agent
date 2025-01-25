const express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const HomeRoutes = require('./src/Routes/HomeRoutes');
const AiRouter = require('./src/Routes/AiRoutes');
const { DatabaseService } = require('./src/Services/DatabaseService');
const databaseService = new DatabaseService();
const AuthRoutes = require('./src/Routes/AuthRoutes');


class App {
    constructor() {
        this.app = express();
        this.setMiddlewares();
        this.setViews();
        this.setRoutes();
        this.setDatabase();
    }

    async setDatabase() {
        try {
            await databaseService.connectToDB();
            //console.log("Database connected successfully");
        } catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }

    setMiddlewares() {
        // CORS for cross-origin requests
        this.app.use(cors());

        // Body parser middleware to handle JSON data
        this.app.use(bodyParser.json());

        // Static folder (public) for serving assets (e.g., CSS, images)
        this.app.use(express.static(path.join(__dirname, '/src/public')));
    }

    setViews() {
        // Set EJS as the template engine
        this.app.set('view engine', 'ejs');

        // Set the folder for views (EJS files)
        this.app.set('views', path.join(__dirname, '/src/Views'));
    }

    setRoutes() {
        // Routes to handle user-related endpoints
        this.app.use('/', HomeRoutes);  // Corrected reference to 'this.app'
        this.app.use('/ai-api', AiRouter); // Add this route
        this.app.use('/auth', AuthRoutes); // Add this route


    }

    listen(port) {
        // Start the server on the specified port
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

// Initialize and start the app
const appInstance = new App();
appInstance.listen(3000); // Start the server on port 3000

module.exports = appInstance;
