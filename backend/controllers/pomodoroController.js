import asyncHandler from 'express-async-handler'
import Pomodoro from '../models/pomodoroModel.js'

// @description create a pomodoro
// @route POST /api/pomodoros/
// @access private

const createPomodoro = asyncHandler(async (req, res) => {
  const { pomodoroSeconds, restSeconds } = req.body

  const pomodoro = new Pomodoro({
    user: req.user._id,
    pomodoroSeconds,
    restSeconds,
  })
  const createdPomodoro = await pomodoro.save()
  res.status(201).json(createdPomodoro)
})

// @description get all pomodoros
// @route GET /api/pomodoros
// @access private

const getMyPomodoros = asyncHandler(async (req, res) => {
  const pomodoros = await Pomodoro.find({ user: req.user._id })
  res.json(pomodoros)
})

export { getMyPomodoros, createPomodoro }
