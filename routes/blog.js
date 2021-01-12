import express from 'express'
import controller from '../controllers/blog.js'
import {protectedMid} from '../middleware/middleware.js'
const router = express.Router()

router.get('/',controller.list)
router.post('/', protectedMid, controller.newPost)
router.get("/:id",controller.detail)

export default router
