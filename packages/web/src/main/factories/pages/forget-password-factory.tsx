import React, { ReactElement } from 'react'
import { ForgetPassword } from '@/presentation/pages'
import { makeForgetPasswordValidation } from '../validations'
import { PublicRoute } from '@/main/proxies'
import { makeRemoteRequestResetPassword } from '../usecases'

export const makeForgetPassword = (): ReactElement<any, any> => {
  return (
    <PublicRoute>
      <ForgetPassword
        validation={makeForgetPasswordValidation()}
        requestResetPassword={makeRemoteRequestResetPassword()}
      />
    </PublicRoute>
  )
}
