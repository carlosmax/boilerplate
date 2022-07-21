import React, { useState } from 'react'
import { CustomCheckbox, FormStatus, Input } from '@/presentation/components'
import FormContext from '@/presentation/contexts/form/form-context'
import LoginAside from './login-aside'

type StateProps = {
  errorMessage?: string
  successMessage?: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({})
  const [email, setEmail] = useState('demo@example.com')
  const inputMessages = { email: '', password: '' }
  const [messages] = useState<any>(inputMessages)
  const [password, setPassword] = useState('123456')

  const onLogin = (e): void => {}

  return (
    <div className={`authentication d-flex flex-column flex-lg-row flex-column-fluid`}>
      <LoginAside></LoginAside>
      <div
        // eslint-disable-next-line max-len
        className={`container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto`}
      >
        <div className='d-flex justify-content-center h-100 align-items-center'>
          <div className={`authentication-content style-2`}>
            <div className='row no-gutters'>
              <div className='col-xl-12 tab-content'>
                <div id='sign-in' className={`auth-form form-validation`}>
                  <FormContext.Provider value={state}>
                    <FormStatus
                      error={state.errorMessage}
                      success={state.successMessage}
                    ></FormStatus>
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
                        <CustomCheckbox
                          id='remember'
                          label='Remember my preference'
                        ></CustomCheckbox>
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
                  </FormContext.Provider>
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
