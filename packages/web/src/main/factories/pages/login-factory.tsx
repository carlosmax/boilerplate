import React, { ReactElement } from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { makeLoginValidation } from '../validations'

export const makeLogin = (): ReactElement<any, any> => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />
}
