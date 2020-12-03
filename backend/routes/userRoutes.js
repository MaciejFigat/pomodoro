import express from 'express'
const router = express.Router()
import { authUser } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.post('/login', authUser)

export default router
