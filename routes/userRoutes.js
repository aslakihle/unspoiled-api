const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { jwtAuth } = require('../middleware/jwtAuth');

router.post("/login", userController.login);
router.put("/register", userController.register);
router.post("/auth", jwtAuth, userController.auth);


module.exports = router;


