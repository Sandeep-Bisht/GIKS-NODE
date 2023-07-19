const ContactController = require('./ContactController');
const express = require('express');
const router = express.Router();

router.post("/",ContactController.createUser);


module.exports = router;