import React from 'react'
import { PasswordReset } from '@/presentation/pages'
import { makePasswordResetValidation } from '../validations'
import { PublicRoute } from '@/main/proxies'
import { makeRemoteResetPassword } from '../usecases'
import { useParams } from 'react-router-dom'

export const PasswordResetWrapper: React.FC = () => {
  const { accountId, resetToken } = useParams()
  return (
    <PublicRoute>
      <PasswordReset
        validation={makePasswordResetValidation()}
        resetPassword={makeRemoteResetPassword()}
        params={{ accountId, resetToken }}
      />
    </PublicRoute>
  )
}
