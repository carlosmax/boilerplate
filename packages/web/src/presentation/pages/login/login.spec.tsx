import React from 'react'
import { render } from '@testing-library/react'

import Login from './login'

describe('Login Component', () => {
  test('Should not render form status message on start', () => {
    const { getByTestId } = render(<Login></Login>)
    const statusWrap = getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)
  })
})
