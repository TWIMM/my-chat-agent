
class HomeController {
    static getHomePage(req, res) {
        const pageTitle = "Welcome !!";
        res.render('index', { title: pageTitle });
    }
}

module.exports = HomeController;
