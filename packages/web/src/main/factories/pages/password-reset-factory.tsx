import React, { ReactElement } from 'react'
import { PasswordReset } from '@/presentation/pages'
import { makeForgetPasswordValidation } from '../validations'
import { PublicRoute } from '@/main/proxies'
import { makeRemoteResetPassword } from '../usecases'

export const makePasswordReset = (): ReactElement<any, any> => {
  return (
    <PublicRoute>
      <PasswordReset
        validation={makeForgetPasswordValidation()}
        resetPassword={makeRemoteResetPassword()}
      />
    </PublicRoute>
  )
}
