import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  createPomodoroDone,
  getMyDonePomodoros,
} from '../controllers/pomodoroDoneController.js'

router.route('/').post(protect, createPomodoroDone)
router.route('/mydonepomodoros').get(protect, getMyDonePomodoros)
// router.route('/:id').put(protect, updatePomodoro)
export default router
