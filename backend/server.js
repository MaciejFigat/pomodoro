import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import morgan from 'morgan'
import colors from 'colors'

dotenv.config()

const app = express()

app.use(express.json())

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
