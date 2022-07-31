import React, { ReactElement } from 'react'
import { Signup } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases'
import { makeSignupValidation } from '../validations'
import { PublicRoute } from '@/main/proxies'

export const makeSignup = (): ReactElement<any, any> => {
  return (
    <PublicRoute>
      <Signup addAccount={makeRemoteAddAccount()} validation={makeSignupValidation()} />
    </PublicRoute>
  )
}
