const express = require('express');
const router = express.Router();
const userFilmController = require('../controllers/UserFilmController');

// Define the route to assign a film to a user
router.post('/assignFilm', userFilmController.assignFilm);

module.exports = router;