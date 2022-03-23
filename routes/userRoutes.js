const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { jwtAuth } = require('../middleware/jwtAuth');

router.post("/login", userController.login);
router.put("/register", userController.register);
router.get("/user", jwtAuth, userController.user);
router.get("/logout", userController.logout);


module.exports = router;


