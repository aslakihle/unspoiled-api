const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

router.post("/", loginController.login);
router.put("/add", loginController.register)


module.exports = router;


