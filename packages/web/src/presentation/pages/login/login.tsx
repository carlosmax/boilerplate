import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { currentAccountState, CustomCheckbox, FormStatus, Input } from '@/presentation/components'
import { Validation } from '@monorepo/validation'
import { Authentication } from '@/domain/usecases'
import { Aside, loginState, Signup } from './components'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const navigate = useNavigate()
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => {
    validate('email')
  }, [state.email])

  useEffect(() => {
    validate('password')
  }, [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isFormInvalid) {
        return
      }

      const account = await authentication.auth({ email: state.email, password: state.password })
      setCurrentAccount(account)
      resetLoginState()
      navigate('/')
    } catch (error) {
      setState((old: any) => ({
        ...old,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={`authentication d-flex flex-column flex-lg-row flex-column-fluid`}>
      <Aside></Aside>
      <div className='container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto'>
        <div className='d-flex justify-content-center h-100 align-items-center'>
          <div className={`authentication-content style-2`}>
            <div className='row no-gutters'>
              <div className='col-xl-12 tab-content'>
                <div id='sign-in' className={`auth-form form-validation`}>
                  <form data-testid='form' onSubmit={handleSubmit} className='form-validate'>
                    <h3 className='text-center mb-4 text-black'>Sign in your account</h3>
                    <Input
                      name='email'
                      label='Email'
                      type='email'
                      placeholder='Type Your Email Address'
                      state={state}
                      setState={setState}
                    ></Input>
                    <Input
                      name='password'
                      label='Password'
                      type='password'
                      placeholder='Type Your Password'
                      state={state}
                      setState={setState}
                    ></Input>
                    <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                      <CustomCheckbox id='remember' label='Remember my preference'></CustomCheckbox>
                    </div>
                    <div className='text-center form-group mb-3'>
                      <button
                        data-testid='submit'
                        type='submit'
                        className='btn btn-primary btn-block'
                        disabled={state.isFormInvalid}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <Signup></Signup>
                  <FormStatus error={state.mainError}></FormStatus>
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
