import { GeneratePasswordReset } from '@/domain/usecases'
import env from '@/main/config/env'
import {
  EmailSenderProvider,
  Encrypter,
  LoadAccountByEmailRepository,
  RandomHexGenerator,
  UpdateResetPasswordTokenRepository,
  ResetPasswordEmailTemplate
} from '@/data/protocols'

export class DbGeneratePasswordReset implements GeneratePasswordReset {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly randomHexGenerator: RandomHexGenerator,
    private readonly encrypter: Encrypter,
    private readonly updateResetPasswordTokenRepository: UpdateResetPasswordTokenRepository,
    private readonly emailSenderProvider: EmailSenderProvider<ResetPasswordEmailTemplate>
  ) {}

  async generate(params: GeneratePasswordReset.Params): Promise<boolean> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)

    if (!account) {
      return false
    }

    const resetToken = this.randomHexGenerator.generate(32)
    const hash = await this.encrypter.encrypt(resetToken)

    await this.updateResetPasswordTokenRepository.updateResetPasswordToken(account.id, hash)

    const link = `${env.clientUrl}/passwordReset/${account.id}/${resetToken}`

    const template: ResetPasswordEmailTemplate = {
      brandName: env.brandName,
      brandPrimaryColor: env.brandPrimaryColor,
      clientUrl: env.clientUrl,
      logoUrl: env.logoUrl,
      supportEmail: env.supportEmail,
      userName: account.name,
      userEmail: account.email,
      resetPasswordLink: link
    }

    await this.emailSenderProvider.send({
      to: account.email,
      subject: 'Redefinição de Senha',
      template
    })

    return true
  }
}
