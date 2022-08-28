import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import express, { Express } from 'express'
// import { Logger } from '@monorepo/logger'

// const LOGGER = Logger('ROUTE')

export default (app: Express): void => {
  app.use(cors({ origin: process.env.CLIENT_URL }))
  app.use(helmet())
  app.use(express.json())

  const stream = {
    write: (text: string) => {
      // LOGGER.info(text)
      console.log(text)
    }
  }

  app.use(morgan('dev', { stream }))
}
