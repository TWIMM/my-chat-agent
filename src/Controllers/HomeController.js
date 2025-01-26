const storageServicesInstance = require('../Services/StorageServices');
const { User, userBusinessModel, AiAgent } = require('../Services/DatabaseService');

class HomeController {
    static getHomePage(req, res) {
        const pageTitle = "Welcome !!";

        res.render('index', { title: pageTitle });
    }

    static serveWidget(req, res) {
        const pageTitle = "Widget !!";
        res.render('widget', { title: pageTitle });
    }

    static async serveIAAgentPage(req, res) {
        const pageTitle = "IA AGENT !!";
        if (!storageServicesInstance.hasStorageVar("user_key")) {
            return res.redirect('/auth/login');
        }
        const email = storageServicesInstance.getStorageVar("user_key");
        try {

            const user = await User.findOne({ where: { email } });
            const dashData = {
                user: user,
            };

            console.log(dashData);

            // Render the admin page with the retrieved data
            res.render('iaagent', {
                title: pageTitle,
                dashData: dashData,
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async serveBusinessModeltPage(req, res) {
        const pageTitle = "Business Model !!";
        if (!storageServicesInstance.hasStorageVar("user_key")) {
            return res.redirect('/auth/login');
        }
        const email = storageServicesInstance.getStorageVar("user_key");
        try {

            const user = await User.findOne({ where: { email } });
            const dashData = {
                user: user,
            };

            console.log(dashData);

            // Render the admin page with the retrieved data
            res.render('businessmodel', {
                title: pageTitle,
                dashData: dashData,
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async serveAdminPage(req, res) {
        const pageTitle = "Dashboard !!";
        if (!storageServicesInstance.hasStorageVar("user_key")) {
            return res.redirect('/auth/login');
        }
        const email = storageServicesInstance.getStorageVar("user_key");
        try {

            const user = await User.findOne({ where: { email } });
            const dashData = {
                user: user,
            };

            console.log(dashData);

            // Render the admin page with the retrieved data
            res.render('admin', {
                title: pageTitle,
                dashData: dashData,
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            res.status(500).send("Internal Server Error");
        }
    }


    static getViewer(req, res) {
        const pageTitle = "Viewer !!";
        res.render('viewer', { title: pageTitle });
    }

}

module.exports = HomeController;
