import { PasswordReset } from '@/domain/usecases'
import { LoadAccountByIdRepository } from '../protocols'

export class DbPasswordReset implements PasswordReset {
  constructor(private readonly loadAccountByIdRepository: LoadAccountByIdRepository) {}

  async reset(params: PasswordReset.Params): Promise<boolean> {
    const account = await this.loadAccountByIdRepository.loadById(params.accountId)

    if (!account) {
      return false
    }

    if (!account.resetPasswordToken) {
      throw new Error('Token de redefinição de senha inválido ou expirado!')
    }

    return true
  }
}
