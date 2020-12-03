const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

//middleware example - detects requests for the routes
// to overtake error response  - it needs to have err as 1st argument
// it means that we assign res.statusCode to error unless its 200 then we assign 500 (if res.statusCode === 200 then error === 500)
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    //I want to have stack traced but only if I'm not in production so if (process.env.NODE_ENV === 'production') then it gives me stack: null or if not then its stack from that error object
  })
}

export { notFound, errorHandler }
