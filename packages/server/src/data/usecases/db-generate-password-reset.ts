import { GeneratePasswordReset } from '@/domain/usecases'
import { Encrypter, LoadAccountByEmailRepository, RandomHexGenerator } from '@/data/protocols'

export class DbGeneratePasswordReset implements GeneratePasswordReset {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly randomHexGenerator: RandomHexGenerator,
    private readonly encrypter: Encrypter
  ) {}

  async generate(params: GeneratePasswordReset.Params): Promise<boolean> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)

    if (!account) {
      return false
    }

    const resetToken = this.randomHexGenerator.generate(32)
    await this.encrypter.encrypt(resetToken)

    return true
  }
}
