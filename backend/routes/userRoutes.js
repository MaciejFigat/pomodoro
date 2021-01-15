import express from 'express'
const router = express.Router()
import { authUser, registerUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)

export default router
