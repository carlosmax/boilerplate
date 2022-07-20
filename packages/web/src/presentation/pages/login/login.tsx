import React, { useState } from 'react'

import Styles from './login-styles.scss'
import LoginAside from './login-aside'
import { Input } from '@/presentation/components'

const Login: React.FC = () => {
  const [email, setEmail] = useState('demo@example.com')
  const errorsObj = { email: '', password: '' }
  const [errors] = useState(errorsObj)
  const [password, setPassword] = useState('123456')

  const onLogin = (e): void => {}

  return (
    <div className={`${Styles.authincation} d-flex flex-column flex-lg-row flex-column-fluid`}>
      <LoginAside></LoginAside>
      <div
        className={`container ${Styles.flex_row_fluid} 
        d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto`}
      >
        <div className='d-flex justify-content-center h-100 align-items-center'>
          <div className={`${Styles.authincation_content} ${Styles.style_2}`}>
            <div className='row no-gutters'>
              <div className='col-xl-12 tab-content'>
                <div id='sign-in' className={`${Styles.auth_form} form-validation`}>
                  {/* {props.errorMessage && (
                    <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                      {props.errorMessage}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                      {props.successMessage}
                    </div>
                  )} */}
                  <form onSubmit={onLogin} className='form-validate'>
                    <h3 className='text-center mb-4 text-black'>Sign in your account</h3>
                    <Input
                      id='val-email'
                      label='Email'
                      type='email'
                      value={email}
                      placeholder='Type Your Email Address'
                      onChange={e => setEmail(e.target.value)}
                      errorMessage={errors.email}
                    ></Input>
                    <Input
                      label='Password'
                      type='password'
                      value={password}
                      placeholder='Type Your Password'
                      onChange={e => setPassword(e.target.value)}
                      errorMessage={errors.password}
                    ></Input>
                    <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                      <div className='form-group mb-3'>
                        <div className='custom-control custom-checkbox ml-1'>
                          <input
                            type='checkbox'
                            className='form-check-input'
                            id='basic_checkbox_1'
                          />
                          <label className='form-check-label' htmlFor='basic_checkbox_1'>
                            Remember my preference
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='text-center form-group mb-3'>
                      <button type='submit' className='btn btn-primary btn-block'>
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className='new-account mt-3'>
                    <p>
                      {"Don't have an account?"} <a className='text-primary'>Sign up</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
