import { SqlAccountRepository } from '@/infra/db'
import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { makeEncrypter, makeHashComparer } from '../../infra/cryptography'

export const makeDbAuthentication = (): Authentication => {
  const hashComparer = makeHashComparer()
  const encrypter = makeEncrypter()
  const accountRepository = new SqlAccountRepository()
  return new DbAuthentication(accountRepository, hashComparer, encrypter, accountRepository)
}
