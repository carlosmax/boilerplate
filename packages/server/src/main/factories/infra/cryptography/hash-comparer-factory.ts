import { HashComparer } from '@/data/protocols'
import { BcryptAdapter } from '@/infra'

export const makeHashComparer = (): HashComparer => {
  const salt = 12
  return new BcryptAdapter(salt)
}
