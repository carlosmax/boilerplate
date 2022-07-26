import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { FormStatus, Input, Logo } from '@/presentation/components'
import { Validation } from '@monorepo/validation'
import { AddAccount } from '@/domain/usecases'
import { signUpState, LoginLink } from './components'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }) => {
  const navigate = useNavigate()
  const [state, setState] = useRecoilState(signUpState)

  useEffect(() => validate('email'), [state.email])

  useEffect(() => validate('password'), [state.password])

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

      navigate('/')
    } catch (error) {
      setState((old: any) => ({
        ...old,
        mainError: error.message
      }))
    }
  }

  return (
    <div className='authentication h-100 p-meddle'>
      <div className='container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden'>
        <div className='row justify-content-center h-100 align-items-center'>
          <div className='col-md-6'>
            <div className='authentication-content'>
              <div className='row no-gutters'>
                <div className='col-xl-12'>
                  <div id='sign-up' className='auth-form'>
                    <div className='text-center mb-3'>
                      <Link to='/login'>
                        <Logo></Logo>
                      </Link>
                    </div>
                    <h4 className='text-center mb-4 '>Sign up your account</h4>
                    <form data-testid='form' onSubmit={handleSubmit}>
                      <Input
                        name='name'
                        label='Name'
                        type='text'
                        placeholder='Name'
                        state={state}
                        setState={setState}
                      ></Input>
                      <Input
                        name='email'
                        label='Email'
                        type='email'
                        placeholder='Email'
                        state={state}
                        setState={setState}
                      ></Input>
                      <Input
                        name='password'
                        label='Password'
                        type='password'
                        placeholder='Password'
                        state={state}
                        setState={setState}
                      ></Input>
                      <Input
                        name='passwordConfirmation'
                        label='Password Confirmation'
                        type='password'
                        placeholder='Password Confirmation'
                        state={state}
                        setState={setState}
                      ></Input>
                      <div className='text-center mt-4'>
                        <button
                          data-testid='submit'
                          type='submit'
                          className='btn btn-primary btn-block'
                          disabled={state.isFormInvalid}
                        >
                          Sign me up
                        </button>
                      </div>
                    </form>
                    <LoginLink></LoginLink>
                    <FormStatus error={state.mainError}></FormStatus>
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

export default Signup
