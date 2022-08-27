import { GeneratePasswordReset } from '@/domain/usecases'
import { LoadAccountByEmailRepository } from '@/data/protocols'

export class DbGeneratePasswordReset implements GeneratePasswordReset {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async generate(params: GeneratePasswordReset.Params): Promise<void> {
    await this.loadAccountByEmailRepository.loadByEmail(params.email)
  }
}
