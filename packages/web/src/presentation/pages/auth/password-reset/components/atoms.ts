import { atom } from 'recoil'

export const passwordResetState = atom({
  key: 'passwordResetState',
  default: {
    isFormInvalid: true,
    password: '',
    passwordError: '',
    showPassword: false,
    passwordConfirmation: '',
    passwordConfirmationError: '',
    showPasswordConfirmation: false,
    mainError: ''
  }
})
