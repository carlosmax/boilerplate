import { atom } from 'recoil'

export const signUpState = atom({
  key: 'signUpState',
  default: {
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  }
})
