import env from '@/main/config/env'
import { SqlAccountRepository } from '@/infra/db'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new SqlAccountRepository()
  return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
}
