import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import express, { Express } from 'express'
import env from '@/main/config/env'
import { Logger } from '@monorepo/logger'

const LOGGER = Logger('ROUTE')

export default (app: Express): void => {
  app.use(cors({ origin: env.clientUrl }))
  app.use(helmet())
  app.use(express.json())

  const stream = {
    write: (text: string) => {
      LOGGER.info(text)
    }
  }

  app.use(morgan('dev', { stream }))
}
