import asyncHandler from 'express-async-handler'
import Pomodoro from '../models/pomodoroModel.js'

// @description create a pomodoro
// @route POST /api/pomodoros/
// @access private

const createPomodoro = asyncHandler(async (req, res) => {
  const { pomodoroSeconds, restSeconds, name, description } = req.body

  const pomodoro = new Pomodoro({
    pomodoroSeconds,
    restSeconds,
    user: req.user._id,
    name,
    description,
  })
  const createdPomodoro = await pomodoro.save()
  res.status(201).json(createdPomodoro)
})

// @description get all my saved pomodoros
// @route GET /api/pomodoros
// @access private

const getMyPomodoros = asyncHandler(async (req, res) => {
  const pomodoros = await Pomodoro.find({ user: req.user._id })
  res.json(pomodoros)
})

// @description update a pomodoro by id
// @route PUT /api/pomodoros/mypomodoros
// @access private

const updatePomodoro = asyncHandler(async (req, res) => {
  const { pomodoroSeconds, restSeconds, name, description } = req.body
  const pomodoro = await Pomodoro.findById(req.params.id)
  if (pomodoro) {
    pomodoro.pomodoroSeconds = pomodoroSeconds
    pomodoro.restSeconds = restSeconds
    pomodoro.name = name
    pomodoro.description = description
    const updatedPomodoro = await pomodoro.save()
    res.json(updatedPomodoro)
  } else {
    res.status(404)
    throw new Error('Pomodoro not found')
  }
})

// @description delete PomodoroDone
// @route DELETE /api/donepomodoros/:id
// @access private/Admin

const deletePomodoro = asyncHandler(async (req, res) => {
  const pomodoro = await Pomodoro.findById(req.params.id)

  if (pomodoro) {
    await pomodoro.remove()
    res.json({ message: 'pomodoro removed' })
  } else {
    res.status(404)
    throw new Error('pomodoro not found')
  }
})

export { getMyPomodoros, createPomodoro, updatePomodoro, deletePomodoro }
