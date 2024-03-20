// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController')

// routes
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
