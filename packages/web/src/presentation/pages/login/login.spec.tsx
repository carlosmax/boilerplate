import React from 'react'
import { render } from '@testing-library/react'

import Login from './login'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login></Login>)
    const statusWrap = getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)
    const emailError = getByTestId('email-error')
    expect(emailError.textContent).toBe('')
    const passwordError = getByTestId('password-error')
    expect(passwordError.textContent).toBe('')
  })
})
