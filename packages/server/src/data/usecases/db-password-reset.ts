import { PasswordReset } from '@/domain/usecases'
import { HashComparer, LoadAccountByIdRepository } from '../protocols'

export class DbPasswordReset implements PasswordReset {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async reset(params: PasswordReset.Params): Promise<boolean> {
    const account = await this.loadAccountByIdRepository.loadById(params.accountId)

    if (
      !account ||
      !account.resetPasswordToken ||
      !account.resetPasswordExpires ||
      account.resetPasswordExpires < new Date()
    ) {
      throw new Error('Token de redefinição de senha inválido ou expirado!')
    }

    const isValid = await this.hashComparer.compare(params.resetToken, account.resetPasswordToken)

    if (!isValid) {
      throw new Error('Token de redefinição de senha inválido ou expirado!')
    }

    return true
  }
}
