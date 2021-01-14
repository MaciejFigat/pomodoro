import asyncHandler from 'express-async-handler'
import PomodoroDone from '../models/pomodoroDoneModel.js'

// @description create a pomodoro done
// @route POST /api/donepomodoros
// @access private

const createPomodoroDone = asyncHandler(async (req, res) => {
  const { pomodoroNumber, secondsDone, pomodoroType, name } = req.body

  const pomodoroDone = new PomodoroDone({
    user: req.user._id,
    pomodoroType,
    secondsDone,
    name,
  })
  const createdPomodoroDone = await pomodoroDone.save()
  res.status(201).json(createdPomodoroDone)
})

// @description get all my done pomodoros
// @route GET /api/donepomodoros
// @access private

const getMyDonePomodoros = asyncHandler(async (req, res) => {
  const pomodoros = await PomodoroDone.find({ user: req.user._id })
  res.json(pomodoros)
})

// @description delete PomodoroDone
// @route DELETE /api/donepomodoros/:id
// @access private/Admin

const deletePomodoroDone = asyncHandler(async (req, res) => {
  const pomodoroDone = await PomodoroDone.findById(req.params.id)

  if (pomodoroDone) {
    await pomodoroDone.remove()
    res.json({ message: 'pomodoroDone removed' })
  } else {
    res.status(404)
    throw new Error('pomodoroDone not found')
  }
})

export { createPomodoroDone, getMyDonePomodoros, deletePomodoroDone }
