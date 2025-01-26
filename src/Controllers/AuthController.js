const { User } = require('../Services/DatabaseService');
const bcrypt = require('bcrypt');

class AuthController {
    static getRegisterPage(req, res) {
        const pageTitle = "Register !!";
        res.render('register', { title: pageTitle });
    }

    static async Register(req, res) {
        try {
            const { name, username, email, phone, password, gender, role } = req.body;

            // Validate input
            if (!username || !email || !password || !gender || !name || !phone || !role) {
                return res.status(400).json({ error: 'All fields are required.' });
            }

            // Check if the email is already registered
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already registered.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and save the user
            const newUser = await User.create({
                name,
                username,
                email,
                phone,
                gender,
                password: hashedPassword,
                role
            });

            // Send success response
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
