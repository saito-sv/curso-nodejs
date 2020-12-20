import express from 'express'
import controller from '../controllers/blog.js'
import bodyParser, { urlencoded } from 'body-parser'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }));
router.get('/', controller.renderBlog);
router.post('/new-post', controller.newPost)
router.get('/new-post', controller.renderNewPost)
router.get("/detail/:id",controller.detail)

export default router
