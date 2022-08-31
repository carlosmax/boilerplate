import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { Alert, Button, Card, CardBody, Col, Container, Form, Label, Row } from 'reactstrap'
import { CustomInput } from '@/presentation/components'
import { Validation } from '@monorepo/validation'
import { passwordResetState } from './components'

import logoDark from '@/presentation/assets/images/logo-dark.png'
import { ResetPassword } from '@/domain/usecases'

type Props = {
  validation: Validation
  resetPassword: ResetPassword
}

const PasswordReset: React.FC<Props> = ({ validation, resetPassword }) => {
  const navigate = useNavigate()
  const resetFormState = useResetRecoilState(passwordResetState)
  const [state, setState] = useRecoilState(passwordResetState)

  useEffect(() => resetFormState(), [])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { password, passwordConfirmation } = state
    const formData = { password, passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.passwordError || !!old.passwordConfirmationError
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isFormInvalid) {
        return
      }

      await resetPassword.reset({ password: state.password })
      navigate('/login')
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

  const handleShowPasswordConfirmation = (): void => {
    setState((old: any) => ({
      ...old,
      showPasswordConfirmation: !state.showPasswordConfirmation
    }))
  }

  document.title = 'Criar Nova Senha'
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
                    <h5 className='text-primary'>Criar Nova Senha</h5>
                    <p className='text-muted'>
                      Sua nova senha deve ser diferente da senha usada anteriormente.
                    </p>
                  </div>
                  {state.mainError ? (
                    <Alert data-testid='form-error' color='danger'>
                      {state.mainError}
                    </Alert>
                  ) : null}
                  <div className='p-2 mt-4'>
                    <Form data-testid='form' onSubmit={handleSubmit} action='#'>
                      <div className='mb-3'>
                        <Label className='form-label' htmlFor='password'>
                          Senha
                        </Label>
                        <div className='position-relative auth-pass-inputgroup mb-3'>
                          <CustomInput
                            name='password'
                            type={state.showPassword ? 'text' : 'password'}
                            placeholder='Digite sua senha'
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
                        <div id='passwordInput' className='form-text'>
                          Deve ter de 8 a 16 caracteres.
                        </div>
                      </div>
                      <div className='mb-3'>
                        <Label className='form-label' htmlFor='password'>
                          Confimação de Senha
                        </Label>
                        <div className='position-relative auth-pass-inputgroup mb-3'>
                          <CustomInput
                            name='passwordConfirmation'
                            type={state.showPasswordConfirmation ? 'text' : 'password'}
                            placeholder='Repita a senha'
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
                              onClick={handleShowPasswordConfirmation}
                            ></i>
                          </button>
                        </div>
                      </div>
                      <div className='mt-4'>
                        <Button
                          data-testid='submit'
                          color='success'
                          className='btn btn-success w-100'
                          type='submit'
                          disabled={state.isFormInvalid}
                        >
                          Entrar
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default PasswordReset
