import { HttpPostClient } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AddAccount.Params, AddAccount.Model>
  ) {}

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    await this.httpClient.post({
      url: this.url,
      body: params
    })
    return null
  }
}
