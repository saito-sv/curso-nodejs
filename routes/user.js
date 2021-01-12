import express from 'express'
import controller from '../controllers/user.js'

const router = express.Router()

router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)


export default router