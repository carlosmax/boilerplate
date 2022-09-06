import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import {
  makeLoginController,
  makeSignUpController,
  makeGeneratePasswordResetController,
  makePasswordResetController
} from '@/main/factories'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/request-reset-password', adaptRoute(makeGeneratePasswordResetController()))
  router.post('/password-reset', adaptRoute(makePasswordResetController()))
}
