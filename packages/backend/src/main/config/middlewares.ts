import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import express, { Express } from 'express'
import { Logger } from '@/infra'

const LOGGER = Logger('ROUTE')

export default (app: Express): void => {
  app.use(cors({ origin: process.env.CORS_ORIGIN }))
  app.use(helmet())
  app.use(express.json())

  const stream = {
    write: (text: string) => {
      LOGGER.info(text)
    },
  }

  app.use(morgan('dev', { stream }))
}
