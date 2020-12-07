import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import colors from 'colors'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('API is running')
  next()
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
