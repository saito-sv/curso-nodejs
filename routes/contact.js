const express = require('express');
const controller = require('../controllers/contact');
const router = express.Router()

router.get('/', controller.renderContact);

module.exports = router