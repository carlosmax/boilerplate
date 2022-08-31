import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { Container, Row, Col, Card, CardBody, Alert, Form } from 'reactstrap'

import { Validation } from '@monorepo/validation'
import { CustomInput } from '@/presentation/components'
import { RequestResetPassword } from '@/domain/usecases'
import { forgetPasswordState } from './components/atoms'

import logoDark from '@/presentation/assets/images/logo-dark.png'

type Props = {
  validation: Validation
  requestResetPassword: RequestResetPassword
}

const ForgetPassword: React.FC<Props> = ({ validation, requestResetPassword }) => {
  const navigate = useNavigate()
  const resetState = useResetRecoilState(forgetPasswordState)
  const [state, setState] = useRecoilState(forgetPasswordState)

  const validate = (): void => {
    setState(old => ({ ...old, emailError: validation.validate('email', state) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isFormInvalid) {
        return
      }

      await requestResetPassword.reset(state.email)
      navigate('/request-reset-password')
    } catch (error) {
      setState((old: any) => ({
        ...old,
        mainError: error.message
      }))
    }
  }

  useEffect(() => resetState(), [])
  useEffect(() => validate(), [state.email])

  document.title = 'Reset Password'
  return (
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
                  <h5 className='text-primary'>Esqueceu a senha?</h5>
                  <p className='text-muted'>Redefinição de senha</p>
                  <div className='avatar-lg mx-auto mt-2 mb-2'>
                    <div className='avatar-title bg-light text-success display-3 rounded-circle'>
                      <i className='ri-mail-send-fill'></i>
                    </div>
                  </div>
                </div>

                <Alert
                  className='alert-borderless alert-warning text-center mb-2 mx-2'
                  role='alert'
                >
                  Enviaremos para o seu e-mail as instruções para redefinição de senha!
                </Alert>
                <div className='p-2'>
                  {state.mainError ? (
                    <Alert data-testid='form-error' color='danger' style={{ marginTop: '13px' }}>
                      {state.mainError}
                    </Alert>
                  ) : null}
                  <Form data-testid='form' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                      <CustomInput
                        name='email'
                        label='E-mail'
                        type='email'
                        placeholder='Digite seu e-mail'
                        state={state}
                        setState={setState}
                      />
                    </div>

                    <div className='text-center mt-4'>
                      <button
                        data-testid='submit'
                        className='btn btn-success w-100'
                        type='submit'
                        disabled={state.isFormInvalid}
                      >
                        Enviar
                      </button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>

            <div className='mt-4 text-center'>
              <p className='mb-0'>
                Espere, eu me lembro da minha senha...{' '}
                <Link
                  data-testid='login-link'
                  to='/login'
                  className='fw-semibold text-primary text-decoration-underline'
                >
                  {' '}
                  Entrar{' '}
                </Link>{' '}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ForgetPassword
