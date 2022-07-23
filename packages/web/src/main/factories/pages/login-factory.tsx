import React, { ReactElement } from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'
import { ValidationComposite, ValidationBuilder as Builder } from '@monorepo/validation'

export const makeLogin = (): ReactElement<any, any> => {
  const makeLoginValidation = (): ValidationComposite =>
    ValidationComposite.build([
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build()
    ])

  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />
}
