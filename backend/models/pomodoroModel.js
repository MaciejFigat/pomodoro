import mongoose from 'mongoose'

const pomodoroSchema = mongoose.Schema(
  {
    pomodoro: {
      type: Number,
      required: true,
    },
  },
  {
    pomodoroDuration: {
      type: Number,
      required: true,
    },
  },
  {
    restDuration: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
)

const Pomodoro = mongoose.model('Pomodoro', pomodoroSchema)

export default Pomodoro
