import express from 'express'
import controller from '../controllers/blog.js'

const router = express.Router()

router.get('/', controller.renderBlog);

export default router
