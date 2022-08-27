import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Container, Row, Col, Card, CardBody, Form, Alert } from 'reactstrap'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { currentAccountState, CustomInput } from '@/presentation/components'
import { Validation } from '@monorepo/validation'
import { AddAccount } from '@/domain/usecases'
import { signUpState, LoginLink } from './components'

import logoDark from '@/presentation/assets/images/logo-dark.png'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }) => {
  const navigate = useNavigate()
  const resetSignUpState = useResetRecoilState(signUpState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(signUpState)
  const [success, setSuccess] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid:
        !!old.nameError ||
        !!old.emailError ||
        !!old.passwordError ||
        !!old.passwordConfirmationError
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isFormInvalid || success) {
        return
      }

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount(account)
      setSuccess(true)
    } catch (error) {
      setState((old: any) => ({
        ...old,
        mainError: error.message
      }))
    }
  }

  useEffect(() => resetSignUpState(), [])
  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])
  useEffect(() => {
    if (success) {
      setTimeout(() => navigate('/dashboard'), 3000)
    }
  }, [success])

  document.title = 'Sign Up'

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
              <p className='mt-3 fs-15 fw-medium'>{`Premium Admin & Dashboard Template`}</p>
            </div>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col md={8} lg={6} xl={5}>
            <Card className='mt-4'>
              <CardBody className='p-4'>
                <div className='text-center mt-2'>
                  <h5 className='text-primary'>Create New Account</h5>
                  <p className='text-muted'>Get your free velzon account now</p>
                </div>
                <div className='p-2 mt-4'>
                  <Form
                    data-testid='form'
                    onSubmit={handleSubmit}
                    className='needs-validation'
                    action='#'
                  >
                    {success && success ? (
                      <>
                        {toast('Your Been Redirect To Login Page...', {
                          position: 'top-right',
                          hideProgressBar: false,
                          className: 'bg-success text-white',
                          progress: undefined,
                          toastId: ''
                        })}
                        <ToastContainer autoClose={2000} limit={1} />
                        <Alert color='success'>
                          {`Register User Successfully and You'll Be Redirect To Login Page...`}
                        </Alert>
                      </>
                    ) : null}

                    {state.mainError ? (
                      <Alert data-testid='form-error' color='danger'>
                        <div>{state.mainError}</div>
                      </Alert>
                    ) : null}
                    <div className='mb-3'>
                      <CustomInput
                        name='name'
                        label='Name'
                        type='text'
                        placeholder='Name'
                        state={state}
                        setState={setState}
                      ></CustomInput>
                    </div>
                    <div className='mb-3'>
                      <CustomInput
                        name='email'
                        label='Email'
                        type='email'
                        placeholder='Email'
                        state={state}
                        setState={setState}
                      ></CustomInput>
                    </div>
                    <div className='mb-3'>
                      <CustomInput
                        name='password'
                        label='Password'
                        type='password'
                        placeholder='Password'
                        state={state}
                        setState={setState}
                      ></CustomInput>
                    </div>
                    <div className='mb-3'>
                      <CustomInput
                        name='passwordConfirmation'
                        label='Password Confirmation'
                        type='password'
                        placeholder='Password Confirmation'
                        state={state}
                        setState={setState}
                      ></CustomInput>
                    </div>
                    <div className='mb-4'>
                      <p className='mb-0 fs-12 text-muted fst-italic'>
                        By registering you agree to the Velzon{' '}
                        <Link
                          to='#'
                          className='text-primary text-decoration-underline fst-normal fw-medium'
                        >
                          Terms of Use
                        </Link>
                      </p>
                    </div>
                    <div className='mt-4'>
                      <button
                        data-testid='submit'
                        type='submit'
                        className='btn btn-success w-100'
                        disabled={state.isFormInvalid}
                      >
                        Sign me up
                      </button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <LoginLink></LoginLink>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Signup
