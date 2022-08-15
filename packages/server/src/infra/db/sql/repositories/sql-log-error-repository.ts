import { LogErrorRepository } from '@/data/protocols'
import { LogErrorDbFactory } from '../factories'
import { LogErrorDb } from '../models'

export class SqlLogErrorRepository implements LogErrorRepository {
  private readonly logErrorDb: LogErrorDb

  constructor() {
    this.logErrorDb = LogErrorDbFactory()
  }

  async logError(stack: string): Promise<void> {
    await this.logErrorDb.create({ stack })
  }
}
