import express from 'express'
import controller from '../controllers/blog.js'
import bodyParser from 'body-parser'
import {protectedMid} from '../middleware/middleware.js'
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', controller.renderBlog);
router.post('/new-post', protectedMid, controller.newPost)
router.get('/new-post', protectedMid, controller.renderNewPost)
router.get("/detail/:id",controller.detail)

export default router
