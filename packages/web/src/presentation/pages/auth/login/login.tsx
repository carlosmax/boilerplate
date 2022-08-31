import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Alert, Button, Card, CardBody, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { currentAccountState, CustomInput } from '@/presentation/components'
import { Validation } from '@monorepo/validation'
import { Authentication } from '@/domain/usecases'
import { loginState, Signup } from './components'

import logoDark from '@/presentation/assets/images/logo-dark.png'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const navigate = useNavigate()
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => resetLoginState(), [])
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

      const account = await authentication.auth({ email: state.email, password: state.password })
      setCurrentAccount(account)
      navigate('/')
    } catch (error) {
      setState((old: any) => ({
        ...old,
        mainError: error.message
      }))
    }
  }

  const handleShowPassword = (): void => {
    setState((old: any) => ({
      ...old,
      showPassword: !state.showPassword
    }))
  }

  document.title = 'Login'
  return (
    <>
      <div className='auth-page-content'>
        <Container>
          <Row>
            <Col lg={12}>
              <div className='text-center mt-sm-5 mb-4 text-white-50'>
                <div>
                  <Link to='/' className='d-inline-block auth-logo'>
                    <img src={logoDark} alt='' height='20' />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <Card className='mt-4'>
                <CardBody className='p-4'>
                  <div className='text-center mt-2'>
                    <h5 className='text-primary'>Bem vindo de volta!</h5>
                    <p className='text-muted'>Faça login para continuar.</p>
                  </div>
                  {state.mainError ? (
                    <Alert data-testid='form-error' color='danger'>
                      {state.mainError}
                    </Alert>
                  ) : null}
                  <div className='p-2 mt-4'>
                    <Form data-testid='form' onSubmit={handleSubmit} action='#'>
                      <div className='mb-3'>
                        <CustomInput
                          name='email'
                          label='Email'
                          type='email'
                          placeholder='Type Your Email Address'
                          state={state}
                          setState={setState}
                        ></CustomInput>
                      </div>
                      <div className='mb-3'>
                        <div className='position-relative auth-pass-inputgroup mb-3'>
                          <CustomInput
                            name='password'
                            label='Password'
                            type={state.showPassword ? 'text' : 'password'}
                            placeholder='Type Your Password'
                            state={state}
                            setState={setState}
                          ></CustomInput>
                          <button
                            className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted'
                            type='button'
                            id='password-addon'
                          >
                            <i
                              className='ri-eye-fill align-middle'
                              onClick={handleShowPassword}
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div className='form-check'>
                        <div className='float-end'>
                          <Link
                            data-testid='forgot-password-link'
                            to='/forgot-password'
                            className='text-muted'
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          className='form-check-input'
                          type='checkbox'
                          value=''
                          id='remember'
                        />
                        <Label className='form-check-label' htmlFor='auth-remember-check'>
                          Remember me
                        </Label>
                      </div>
                      <div className='mt-4'>
                        <Button
                          data-testid='submit'
                          color='success'
                          className='btn btn-success w-100'
                          type='submit'
                          disabled={state.isFormInvalid}
                        >
                          Sign In
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <Signup></Signup>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Login
