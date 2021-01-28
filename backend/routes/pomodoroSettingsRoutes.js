import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  getPomodoroSettings,
  createPomodoroSettings,
} from '../controllers/pomodoroSettingsController.js'

router
  .route('/')
  .get(protect, getPomodoroSettings)
  .post(protect, createPomodoroSettings)

export default router
