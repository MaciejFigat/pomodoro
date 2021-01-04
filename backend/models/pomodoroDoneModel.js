import mongoose from 'mongoose'

const pomodoroDoneSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    pomodoroNumber: {
      type: Number,
      required: true,
    },
    secondsDone: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
  }
)

const PomodoroDone = mongoose.model('PomodoroDone', pomodoroDoneSchema)

export default PomodoroDone
