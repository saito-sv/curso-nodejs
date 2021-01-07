import express from 'express'
import controller from '../controllers/contact.js'
import bodyParser from 'body-parser'

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', controller.contact);

export default router