import { BuildOptions, Model } from 'sequelize'
import { LogError } from '@/domain/models'

export interface LogErrorModel extends Model<LogError>, LogError {}

export type LogErrorDb = typeof Model &
  (new (values?: object, options?: BuildOptions) => LogErrorModel)
