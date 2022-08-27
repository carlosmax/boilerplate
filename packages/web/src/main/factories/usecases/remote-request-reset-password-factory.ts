import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'
import { RemoteRequestResetPassword } from '@/data/usecases'
import { RequestResetPassword } from '@/domain/usecases'

export const makeRemoteRequestResetPassword = (): RequestResetPassword =>
  new RemoteRequestResetPassword(makeApiUrl('request-reset-password'), makeAxiosHttpClient())
