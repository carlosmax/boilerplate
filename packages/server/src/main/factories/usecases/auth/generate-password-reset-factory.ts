import { ResetPasswordEmailTemplate } from '@/data/protocols'
import { DbGeneratePasswordReset } from '@/data/usecases'
import { GeneratePasswordReset } from '@/domain/usecases'
import { CryptoAdapter, SqlAccountRepository, SendGridAdapter, MessageTemplateType } from '@/infra'
import env from '@/main/config/env'
import { makeEncrypter } from '@/main/factories/infra/cryptography'

export const makeGeneratePasswordReset = (): GeneratePasswordReset => {
  const accountRepository = new SqlAccountRepository()
  const randomHexGenerator = new CryptoAdapter()
  const encrypter = makeEncrypter()
  const emailSender = new SendGridAdapter<ResetPasswordEmailTemplate>(
    env.sendGridKey,
    env.senderEmail,
    MessageTemplateType.RESET_PASSWORD
  )

  return new DbGeneratePasswordReset(
    accountRepository,
    randomHexGenerator,
    encrypter,
    accountRepository,
    emailSender
  )
}
