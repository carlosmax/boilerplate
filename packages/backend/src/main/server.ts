import 'module-alias/register'
import { setupApp } from './config/app'
import { Logger } from '@/infra'

// Captura erros assíncronos
require('express-async-errors')

const LOGGER = Logger(__filename)

const app = setupApp()
app.listen(process.env.PORT, () =>
  LOGGER.info(`Server running at http://localhost:${process.env.PORT}`)
)
