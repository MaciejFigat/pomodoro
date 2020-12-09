import asyncHandler from 'express-async-handler'
import Pomodoro from '../models/pomodoroModel.js'
// @description get all pomodoros
// @route GET /api/pomodoro
// @access public

const getPomodoros = asyncHandler(async (req, res) => {
  const pomodoros = await Pomodoro.find({})
  res.json(pomodoros)
})

// @description create a pomodoro
// @route POST /api/pomodoros/
// @access public

const createPomodoro = asyncHandler(async (req, res) => {
  const pomodoro = new Pomodoro({
    pomodoro: 0,
    pomodoroDuration: 25,
    restDuration: 5,
  })
  const createdPomodoro = await pomodoro.save()
  res.status(201).json(createdPomodoro)
})

export { getPomodoros, createPomodoro }
