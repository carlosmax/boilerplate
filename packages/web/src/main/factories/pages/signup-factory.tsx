import React, { ReactElement } from 'react'
import { Signup } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases'
import { makeSignupValidation } from '../validations'

export const makeSignup = (): ReactElement<any, any> => {
  return <Signup addAccount={makeRemoteAddAccount()} validation={makeSignupValidation()} />
}
