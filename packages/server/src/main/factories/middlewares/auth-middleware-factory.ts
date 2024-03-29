import { makeLoadAccountByToken } from '@/main/factories'
import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeLoadAccountByToken(), role)
}
