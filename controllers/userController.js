const user = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingEmail = await user.User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email già esistente' });
        }
        
        const existingUsername = await user.User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: 'Username già in uso' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new user.User({
            username,
            email,
            passwordHash: passwordHash
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Account Created' });
    } catch (error) {
        res.status(500).json({ message: 'Errore del server', error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({message: 'Email o Password errati' });
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({message: 'Email o Password errati' });
        }
        res.status(200).json({ id: existingUser._id, username: existingUser.username });
    } catch (error) {
        res.status(500).json( error );
    }
}

const auth0 = async (req, res) => {
    const { email, username } = req.body;
    try {
        const existingUser = await user.User.findOne({ email });
        if (!existingUser) {
            const newUser = new user.User({
                username,
                email
            });
            const savedUser = await newUser.save();
            res.status(201).json({ id: savedUser._id, username: savedUser.username });
        } else {
            res.status(200).json({ id: existingUser._id, username: existingUser.username });
        }
    } catch (error) {
        res.status(500).json( error );
    }
}


module.exports = {
    register,
    login,
    auth0
};