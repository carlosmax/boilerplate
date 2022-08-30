import { Encrypter } from '@/data/protocols'
import { JwtAdapter } from '@/infra'
import env from '@/main/config/env'

export const makeEncrypter = (): Encrypter => {
  return new JwtAdapter(env.jwtSecret)
}
