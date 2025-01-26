const { User } = require('../Services/DatabaseService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const storageServicesInstance = require('../Services/StorageServices');

class AuthController {
    static getRegisterPage(req, res) {
        const pageTitle = "Register !!";
        res.render('register', { title: pageTitle });
    }

    static getLoginPage(req, res) {
        const pageTitle = "Login !!";
        res.render('login', { title: pageTitle });
    }

    static async Login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Both fields are required.' });
        }

        try {
            // Check if the user exists
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).json({ success: false, message: 'User not found.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Incorrect password.' });
            }

            const payload = { id: user.id, username: user.username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '6h' });
            storageServicesInstance.setStorageVar('user_key', user.id);

            return res.status(200).json({
                success: true,
                message: 'Login successful!',
                token,
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    static generateJwtToken(user) {

    }

    static async Register(req, res) {
        try {
            const { name, username, email, phone, password, gender, role } = req.body;

            if (!username || !email || !password || !gender || !name || !phone || !role) {
                return res.status(400).json({ error: 'All fields are required.' });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already registered.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                username,
                email,
                phone,
                gender,
                password: hashedPassword,
                role
            });

            return res.status(201).json({
                message: 'User registered successfully!',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    username: newUser.username,
                    role: newUser.role
                }
            });
        } catch (error) {
            console.error('Error during registration:', error.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }





}

module.exports = AuthController;
