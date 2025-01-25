
class HomeController {
    static getHomePage(req, res) {
        const pageTitle = "Welcome !!";
        res.render('index', { title: pageTitle });
    }

    static getViewer(req, res) {
        const pageTitle = "Viewer !!";
        res.render('viewer', { title: pageTitle });
    }

}

module.exports = HomeController;
