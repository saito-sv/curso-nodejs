const express = require('express');
const controller = require('../controllers/blog');

const router = express.Router()

router.get('/', controller.renderBlog);

module.exports = router
