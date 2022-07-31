import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className='authentication h-100 d-flex flex-column flex-column-fluid'>
      <div className='container flex-row-fluid d-flex flex-column justify-content-center'>
        <div className='row justify-content-center h-100 align-items-center '>
          <div className='col-md-5'>
            <div className='form-input-content text-center error-page'>
              <h1 className='error-text font-weight-bold'>404</h1>
              <h4>
                <i className='fa fa-exclamation-triangle text-warning' /> The page you were looking
                for is not found!
              </h4>
              <p>You may have mistyped the address or the page may have moved.</p>
              <div>
                <Link className='btn btn-primary' to='/'>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
