import React, { ReactElement } from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '../validations'
import { PublicRoute } from '@/main/proxies'

export const makeLogin = (): ReactElement<any, any> => {
  return (
    <PublicRoute>
      <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />
    </PublicRoute>
  )
}
