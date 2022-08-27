import { atom } from 'recoil'

export const forgetPasswordState = atom({
  key: 'forgetPasswordState',
  default: {
    isFormInvalid: true,
    email: '',
    emailError: '',
    mainError: ''
  }
})
