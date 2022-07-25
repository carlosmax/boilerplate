import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  }
})
