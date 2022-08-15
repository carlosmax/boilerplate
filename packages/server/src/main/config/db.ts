import { Sequelize, Dialect } from 'sequelize'

export const Database = new Sequelize(
  process.env.DB_NAME || 'base',
  process.env.DB_USER || 'root',
  process.env.DB_PWD || 'root',
  {
    dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    logging: process.env.DB_LOGS === 'true'
  }
)
