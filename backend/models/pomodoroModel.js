import mongoose from 'mongoose'

const pomodoroSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    pomodoroSeconds: {
      type: Number,
      required: true,
    },
    restSeconds: {
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
