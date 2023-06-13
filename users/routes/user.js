const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route d'inscription
router.post('/register', userController.register);

// Route pour récupérer les informations de l'utilisateur actuellement connecté
router.get('/profile', userController.getProfile);

module.exports = router;
