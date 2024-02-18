//* Logeador en consola para mensajes info y error
//* Si el node_env no es test se usa el logger
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}
module.exports = {
  info,
  error,
}
