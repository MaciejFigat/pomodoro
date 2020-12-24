import mongoose from 'mongoose'

const pomodoroSettingsSchema = mongoose.Schema(
  {
    pomodoroSeconds: {
      type: Number,
      required: true,
    },
    restSeconds: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
)

const PomodoroSettings = mongoose.model(
  'PomodoroSettings',
  pomodoroSettingsSchema
)

export default PomodoroSettings
