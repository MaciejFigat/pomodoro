import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import path from 'path'
import userRoutes from './routes/userRoutes.js'
import pomodoroRoutes from './routes/pomodoroRoutes.js'
import pomodoroSettingsRoutes from './routes/pomodoroSettingsRoutes.js'
import pomodoroDoneRoutes from './routes/pomodoroDoneRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())

app.use('/api/donepomodoros', pomodoroDoneRoutes)
app.use('/api/pomodoros', pomodoroRoutes)
app.use('/api/settings', pomodoroSettingsRoutes)
app.use('/api/users', userRoutes)

const __dirname = path.resolve()

// response.writeHead(201, {
//   'Content-Type': 'application/javascript',
// })

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('service-worker.js', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'frontend', 'build', 'service-worker.js')
    )
  })
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
    next()
  })
}
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
