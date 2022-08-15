import { DbAddAccount } from '@/data/usecases'
import { AddAccount } from '@/domain/usecases'
import { SqlAccountRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new SqlAccountRepository()
  return new DbAddAccount(bcryptAdapter, accountRepository, accountRepository)
}
