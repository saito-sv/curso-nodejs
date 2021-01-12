import express from 'express'
import controller from '../controllers/auth.js'

const router = express.Router()

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/verify', controller.verifyEmail);

export default router
