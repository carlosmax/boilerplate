import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteResetPassword } from '@/data/usecases'
import { ResetPassword } from '@/domain/usecases'

export const makeRemoteResetPassword = (): ResetPassword =>
  new RemoteResetPassword(makeApiUrl('password-reset'), makeAxiosHttpClient())
