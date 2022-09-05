import { PasswordReset } from '@/domain/usecases'
import { LoadAccountByIdRepository } from '../protocols'

export class DbPasswordReset implements PasswordReset {
  constructor(private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}

  async reset(params: PasswordReset.Params): Promise<boolean> {
    await this.loadAccountByIdRepository.loadById(params.accountId)
    return true
  }
}
