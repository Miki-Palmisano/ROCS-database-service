const express = require('express');
const router = express.Router();
const list = require('../controllers/listController');

router.post('/favorite', list.FavoriteContentID)
router.get('/favorite/status', list.GetFavoriteStatusContentID)
router.post('/add', list.AddContentID)
router.get('/state', list.GetStatusContentID)

module.exports = router;