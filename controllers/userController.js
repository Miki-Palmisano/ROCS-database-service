const user = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new user.User({
        username,
        email,
        passwordHash: passwordHash
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Account Created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ id: existingUser._id, username: existingUser.username });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
    register,
    login
};