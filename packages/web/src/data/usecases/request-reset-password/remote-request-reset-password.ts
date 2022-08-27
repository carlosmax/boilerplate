import { RequestResetPassword } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'

export class RemoteRequestResetPassword implements RequestResetPassword {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<any, void>
  ) {}

  async reset(email: string): Promise<void> {
    const response = await this.httpClient.post({
      url: this.url,
      body: { email }
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      default:
        throw new UnexpectedError()
    }
  }
}
