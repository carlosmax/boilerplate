import env from '@/main/config/env'
import { LoadAccountByToken } from '@/domain/usecases'
import { DbLoadAccountByToken } from '@/data/usecases'
import { SqlAccountRepository } from '@/infra/db'
import { JwtAdapter } from '@/infra/cryptography'

export const makeLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new SqlAccountRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountRepository)
}
