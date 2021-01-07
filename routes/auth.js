import express from 'express'
import controller from '../controllers/auth.js'
import bodyParser from 'body-parser'

const router = express.Router()
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/verify', controller.verifyEmail);

export default router
