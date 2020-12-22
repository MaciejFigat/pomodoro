import asyncHandler from 'express-async-handler'
import PomodoroSettings from '../models/pomodoroSettingsModel.js'

// @description get pomodoroSettings
// @route GET /api/pomodoroSettings
// @access private

const getPomodoroSettings = asyncHandler(async (req, res) => {
  // const pomodoroSettings = await PomodoroSettings.find({ user: req.user._id })
  const pomodoroSettings = await PomodoroSettings.find({})

  res.json(pomodoroSettings)
})

// @description create a pomodoroSetting
// @route POST /api/pomodoros/
// @access private

const createPomodoroSettings = asyncHandler(async (req, res) => {
  const { pomodoroSeconds, restSeconds } = req.body
  const pomodoroSettings = new PomodoroSettings({
    pomodoroSeconds,
    restSeconds,
    // user: req.user._id,
  })
  const createdPomodoroSettings = await pomodoroSettings.save()
  res.status(201).json(createdPomodoroSettings)
})

export { getPomodoroSettings, createPomodoroSettings }
