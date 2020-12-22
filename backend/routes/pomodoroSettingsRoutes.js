import express from 'express'
const router = express.Router()
import {
  getPomodoroSettings,
  createPomodoroSettings,
} from '../controllers/pomodoroSettingsController.js'

import { protect } from '../middleware/authMiddleware.js'

// router.route('/pomodoroSettings').get(protect, getPomodoroSettings)
router.route('/settings').get(getPomodoroSettings).post(createPomodoroSettings)

export default router
