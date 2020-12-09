import express from 'express'

const router = express.Router()
import {
  getPomodoros,
  createPomodoro,
} from '../controllers/pomodoroController.js'

router.route('/').get(getPomodoros).post(createPomodoro)

export default router
