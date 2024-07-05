const e = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    filmList: [
        {
            id: String,
            status: ['Visto', 'In Visione', 'Da Vedere']
        }
    ],
    serieList: [
        {
            id: String,
            status: ['Visto', 'In Visione', 'Da Vedere']
        }
    ],
    favouriteList: [
        {
            id: String,
            type: ['Film', 'Serie']
        }
    ]
});

exports.User = mongoose.model('User', userSchema);