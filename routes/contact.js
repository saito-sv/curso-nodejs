import express from 'express'
import controller from '../controllers/contact.js'
const router = express.Router()

router.get('/', controller.renderContact);

export default router