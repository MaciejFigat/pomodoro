import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  getMyPomodoros,
  createPomodoro,
} from '../controllers/pomodoroController.js'

router.route('/').post(protect, createPomodoro)
router.route('/mypomodoros').get(protect, getMyPomodoros)
export default router
