const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080
const app = express()

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json({ limit: '5mb', extended: true }))
  app.use(express.urlencoded({ limit: '5mb', extended: true }))

  // auth and api routes
  app.use('/api', require('./api'))
  // app.use('/auth', require('./auth'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'res')))

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )
}

startListening()
createApp()
