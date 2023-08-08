const router = require('express').Router()

//* === Modelos de la db ===
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  // Elimina todos los post y usuarios
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
