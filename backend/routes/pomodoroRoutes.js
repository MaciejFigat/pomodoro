import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()
import {
  getMyPomodoros,
  createPomodoro,
  updatePomodoro,
  deletePomodoro,
} from '../controllers/pomodoroController.js'

router.route('/').post(protect, createPomodoro)
router.route('/mypomodoros').get(protect, getMyPomodoros)
router
  .route('/:id')
  .put(protect, updatePomodoro)
  .delete(protect, deletePomodoro)
export default router
