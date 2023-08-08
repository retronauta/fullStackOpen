require('dotenv').config()

const PORT = process.env.PORT

//* Si el script es para test se usa x url, caso contrario el otro de dev y prod
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

//* Exporta la URI para la conexion a la DB dependiendo del env
module.exports = {
  MONGODB_URI,
  PORT,
}
