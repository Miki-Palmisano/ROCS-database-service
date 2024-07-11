const express = require('express');
const router = express.Router();
const db = require('../controllers/userController');

router.post('/register', db.register)
router.post('/login', db.login)
router.post('/auth', db.auth0)

module.exports = router;