const User = require('../models/User');
const bcrypt = require('bcrypt');

const userController = {
    register: async (req, res) => {
        const { username, dob, email, password } = req.body;
        try {
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            //Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            //new user
            const newUser = new User({
                username,
                dob,
                email,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            // Compare the password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            res.status(200).json({ message: 'User authenticated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = userController;
