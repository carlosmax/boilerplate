import { PasswordReset } from '@/domain/usecases'
import { Encrypter, LoadAccountByIdRepository } from '../protocols'

export class DbPasswordReset implements PasswordReset {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly encrypter: Encrypter
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

    await this.encrypter.encrypt(params.resetToken)

    return true
  }
}
