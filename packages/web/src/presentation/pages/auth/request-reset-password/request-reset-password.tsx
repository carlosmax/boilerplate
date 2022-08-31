import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

import logoDark from '@/presentation/assets/images/logo-dark.png'

const RequestResetPassword: React.FC = () => {
  document.title = 'Request Reset Password'
  return (
    <>
      <div className='auth-page-content'>
        <Container>
          <Row>
            <Col lg={12}>
              <div className='text-center mt-sm-5 mb-4 text-white-50'>
                <div>
                  <Link to='/dashboard' className='d-inline-block auth-logo'>
                    <img src={logoDark} alt='' height='20' />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='justify-content-center'>
            <Col md={8} lg={6} xl={5}>
              <Card className='mt-4'>
                <CardBody className='p-4 text-center'>
                  <div className='avatar-lg mx-auto mt-2'>
                    <div className='avatar-title bg-light text-success display-3 rounded-circle'>
                      <i className='ri-checkbox-circle-fill'></i>
                    </div>
                  </div>
                  <div className='mt-4 pt-2'>
                    <h4>Redefinição de Senha</h4>
                    <p className='text-muted mx-4'>
                      Se encontrarmos uma conta associada a esse e-mail, enviaremos instruções de
                      redefinição de senha para o endereço de e-mail principal da conta.
                    </p>
                    <div className='mt-4'>
                      <Link to='/login' className='btn btn-success w-100'>
                        Voltar para o Login
                      </Link>
                    </div>
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

export default RequestResetPassword
