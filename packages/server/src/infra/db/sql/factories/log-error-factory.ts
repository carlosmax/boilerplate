import { DataTypes } from 'sequelize'
import { Database } from '@/main/config/db'
import { LogErrorDb } from '@/infra/db/sql/models'

export function LogErrorDbFactory(): LogErrorDb {
  return Database.define(
    'logError',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      stack: {
        type: DataTypes.TEXT
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      freezeTableName: true
    }
  ) as LogErrorDb
}
