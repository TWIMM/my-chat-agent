
class AuthController {
    static getRegisterPage(req, res) {
        const pageTitle = "Register !!";
        res.render('register', { title: pageTitle });
    }

    static Register(req, res) {

    }



}

module.exports = AuthController;
