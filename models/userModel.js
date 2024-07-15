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
        required: false
    },
    filmList: [
        {
            filmId: {
                type: String
            },
            img: {
                type: String
            },
            status: {
                type: String,
                enum: ['Visto', 'Da Vedere', 'In Visione']
            },
            vote: {
                type: Number,
                min: 0,
                max: 10
            }
        }
    ],
    serieList: [
        {
            serieId: {
                type: String
            },
            img: {
                type: String
            },
            status: {
                type: String,
                enum: ['Visto', 'Da Vedere', 'In Visione']
            },
            vote: {
                type: Number,
                min: 0,
                max: 10
            }
        }
    ],
    favoriteList: [
        {
            favoriteId: {
                type: String
            },
            img: {
                type: String
            },
            type: {
                type: String,
                enum: ['film', 'serie']
            }
        }
    ]
});

exports.User = mongoose.model('User', userSchema);