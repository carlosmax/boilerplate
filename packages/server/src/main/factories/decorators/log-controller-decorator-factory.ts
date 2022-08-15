import { LogControllerDecorator } from '@/main/decorators'
import { SqlLogErrorRepository } from '@/infra/db'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new SqlLogErrorRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
