const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

//* === Conexion del servidor ===
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
