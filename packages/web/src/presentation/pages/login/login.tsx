import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormContext from '@/presentation/contexts/form/form-context'
import { CustomCheckbox, FormStatus, Input } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'
import LoginAside from './login-aside'

type Props = {
  validation: Validation
  authentication: Authentication
}

type StateProps = {
  email: string
  password: string
  emailError: string
  passwordError: string
  errorMessage: string
  successMessage: string
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const navigate = useNavigate()
  const [state, setState] = useState<StateProps>({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    errorMessage: '',
    successMessage: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email)
    })
  }, [state.email])

  useEffect(() => {
    setState({
      ...state,
      passwordError: validation.validate('password', state.password)
    })
  }, [state.password])

  const disableSubmit = (): boolean => {
    return !state.email || !!state.emailError || !state.password || !!state.passwordError
  }

  const isFormValid = (): boolean => {
    return !!state.email && !!state.password
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (isFormValid()) {
        const account = await authentication.auth({ email: state.email, password: state.password })
        localStorage.setItem('accessToken', account.accessToken)
        setState((old: any) => ({
          ...old,
          successMessage: 'Sucesso!'
        }))
        navigate('/')
      }
    } catch (error) {
      setState((old: any) => ({
        ...old,
        errorMessage: error.message
      }))
    }
  }

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
                  <FormContext.Provider value={{ state, setState }}>
                    <form data-testid='form' onSubmit={handleSubmit} className='form-validate'>
                      <h3 className='text-center mb-4 text-black'>Sign in your account</h3>
                      <Input
                        id='email'
                        label='Email'
                        type='email'
                        value={state.email}
                        placeholder='Type Your Email Address'
                        errorMessage={state.emailError}
                      ></Input>
                      <Input
                        id='password'
                        label='Password'
                        type='password'
                        value={state.password}
                        placeholder='Type Your Password'
                        errorMessage={state.passwordError}
                      ></Input>
                      <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                        <CustomCheckbox
                          id='remember'
                          label='Remember my preference'
                        ></CustomCheckbox>
                      </div>
                      <div className='text-center form-group mb-3'>
                        <button
                          data-testid='submit'
                          type='submit'
                          className='btn btn-primary btn-block'
                          disabled={disableSubmit()}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div className='new-account mt-3'>
                      <p>
                        {"Don't have an account?"}{' '}
                        <Link data-testid='signup' to='/signup' className='text-primary'>
                          Sign up
                        </Link>
                      </p>
                    </div>
                    <FormStatus error={state.errorMessage}></FormStatus>
                    {state.successMessage && (
                      <input
                        data-testid='hiddenSuccess'
                        type='hidden'
                        value={state.successMessage}
                      ></input>
                    )}
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
