const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

//* === controladores ===
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

//* Si el node_env es test se usa la ruta /api/testing que sirve para resetear la db
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

//* === Conexion a la db ===
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

//* === Rutas ===
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

//* Middleware para end point desconocido
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
