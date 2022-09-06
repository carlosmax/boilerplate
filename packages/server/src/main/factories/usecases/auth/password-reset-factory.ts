import { DbPasswordReset } from '@/data/usecases'
import { PasswordReset } from '@/domain/usecases'
import { SqlAccountRepository } from '@/infra'
import { makeEncrypter, makeHashComparer } from '../../infra/cryptography'

export const makePasswordReset = (): PasswordReset => {
  const accountRepository = new SqlAccountRepository()
  const hashComparer = makeHashComparer()
  const encrypter = makeEncrypter()

  return new DbPasswordReset(accountRepository, accountRepository, hashComparer, encrypter)
}
