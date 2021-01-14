import mongoose from 'mongoose'

const pomodoroDoneSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    pomodoroType: {
      type: Boolean,
      required: false,
    },
    secondsDone: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
)

const PomodoroDone = mongoose.model('PomodoroDone', pomodoroDoneSchema)

export default PomodoroDone
