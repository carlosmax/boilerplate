import { GeneratePasswordReset } from '@/domain/usecases'
import {
  Encrypter,
  LoadAccountByEmailRepository,
  RandomHexGenerator,
  SendResetPasswordMessage,
  UpdateResetPasswordTokenRepository
} from '@/data/protocols'

export class DbGeneratePasswordReset implements GeneratePasswordReset {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly randomHexGenerator: RandomHexGenerator,
    private readonly encrypter: Encrypter,
    private readonly updateResetPasswordTokenRepository: UpdateResetPasswordTokenRepository,
    private readonly sendResetPasswordMessage: SendResetPasswordMessage
  ) {}

  async generate(params: GeneratePasswordReset.Params): Promise<boolean> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)

    if (!account) {
      return false
    }

    const resetToken = this.randomHexGenerator.generate(32)
    const hash = await this.encrypter.encrypt(resetToken)

    await this.updateResetPasswordTokenRepository.updateResetPasswordToken(account.id, hash)
    await this.sendResetPasswordMessage.sendResetPassword(account.id, resetToken)

    return true
  }
}
