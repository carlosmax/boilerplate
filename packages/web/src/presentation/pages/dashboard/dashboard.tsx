import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import BreadCrumb from '@/presentation/components/velzon/breadcrumb'

const Dashboard: React.FC = () => {
  document.title = 'Dashboard'
  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          <BreadCrumb title='Dashboard' pageTitle='Dashboards' />
          <Row>
            <Col>{'Teste'}</Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
