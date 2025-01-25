
class HomeController {
    static getHomePage(req, res) {
        const pageTitle = "Welcome !!";
        res.render('index', { title: pageTitle });
    }

    static serveWidget(req, res) {
        const pageTitle = "Widget !!";
        res.render('widget', { title: pageTitle });
    }

    static serveAdminPage(req, res) {
        const pageTitle = "Dashboard !!";
        res.render('admin', { title: pageTitle });
    }

    static getViewer(req, res) {
        const pageTitle = "Viewer !!";
        res.render('viewer', { title: pageTitle });
    }

}

module.exports = HomeController;
