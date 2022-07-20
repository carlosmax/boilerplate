import React, { useState } from 'react'
import { CustomCheckbox, FormStatus, Input } from '@/presentation/components'
import LoginAside from './login-aside'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  const [email, setEmail] = useState('demo@example.com')
  const inputMessages = { email: '', password: '' }
  const [messages] = useState<any>(inputMessages)
  const [password, setPassword] = useState('123456')

  const onLogin = (e): void => {}

  return (
    <div className={`${Styles.authentication} d-flex flex-column flex-lg-row flex-column-fluid`}>
      <LoginAside></LoginAside>
      <div
        className={`container ${Styles.flex_row_fluid} 
        d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto`}
      >
        <div className='d-flex justify-content-center h-100 align-items-center'>
          <div className={`${Styles.authentication_content} ${Styles.style_2}`}>
            <div className='row no-gutters'>
              <div className='col-xl-12 tab-content'>
                <div id='sign-in' className={`${Styles.auth_form} form-validation`}>
                  <FormStatus error={messages.error} success={messages.success}></FormStatus>
                  <form onSubmit={onLogin} className='form-validate'>
                    <h3 className='text-center mb-4 text-black'>Sign in your account</h3>
                    <Input
                      id='email'
                      label='Email'
                      type='email'
                      value={email}
                      placeholder='Type Your Email Address'
                      onChange={e => setEmail(e.target.value)}
                      errorMessage={messages.email}
                    ></Input>
                    <Input
                      label='Password'
                      type='password'
                      value={password}
                      placeholder='Type Your Password'
                      onChange={e => setPassword(e.target.value)}
                      errorMessage={messages.password}
                    ></Input>
                    <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                      <CustomCheckbox id='remember' label='Remember my preference'></CustomCheckbox>
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
