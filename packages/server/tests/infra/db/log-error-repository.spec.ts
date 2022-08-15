import { faker } from '@faker-js/faker'

import { LogErrorRepository } from '@/data/protocols'
import { LogErrorDbFactory, LogErrorDb, SqlLogErrorRepository } from '@/infra/db'
import { Database } from '@/main/config/db'

const makeSut = (): LogErrorRepository => {
  return new SqlLogErrorRepository()
}

describe('LogMongoRepository', () => {
  // Set the db object to a variable which can be accessed throughout the whole test file
  const db: any = Database
  let logDb: LogErrorDb

  // Before any tests run, clear the DB and run migrations with Sequelize sync()
  beforeAll(async () => {
    await db.connectionManager.sequelize.sync({ force: true })
    logDb = LogErrorDbFactory()
  })

  // After all tersts have finished, close the DB connection
  afterAll(async () => {
    await db.connectionManager.sequelize.close()
  })

  beforeEach(async () => {
    await logDb.destroy({
      where: {},
      truncate: true
    })
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.random.words())
    const count = await logDb.count()
    expect(count).toBe(1)
  })
})
