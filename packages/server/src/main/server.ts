import 'module-alias/register'
// import * as dotenv from 'dotenv'
import { setupApp } from './config/app'
import { Logger } from '@monorepo/logger'

// dotenv.config()

require('./config/db')

// Captura erros assíncronos
require('express-async-errors')

const LOGGER = Logger(__filename)

const app = setupApp()
app.listen(process.env.PORT, async () => {
  LOGGER.info(`Server running at http://localhost:${process.env.PORT}`)
})
