import asyncHandler from 'express-async-handler'
import PomodoroDone from '../models/pomodoroDoneModel.js'

// @description create a pomodoro done
// @route POST /api/pomodoroDone
// @access private

const createPomodoroDone = asyncHandler(async (req, res) => {
  const { pomodoroNumber } = req.body

  const pomodoroDone = new PomodoroDone({
    user: req.user._id,
    pomodoroNumber,
  })
  const createdPomodoroDone = await pomodoroDone.save()
  res.status(201).json(createdPomodoroDone)
})

// @description get all my done pomodoros
// @route GET /api/pomodorosDone
// @access private

const getMyDonePomodoros = asyncHandler(async (req, res) => {
  const pomodoros = await PomodoroDone.find({ user: req.user._id })
  res.json(pomodoros)
})

export { createPomodoroDone, getMyDonePomodoros }
