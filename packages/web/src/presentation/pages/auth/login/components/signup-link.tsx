import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const SignupLink: React.FC = () => {
  return (
    <div className='mt-4 text-center'>
      <p className='mb-0'>
        {"Don't have an account?"}{' '}
        <Link
          data-testid='signup-link'
          to='/signup'
          className='fw-semibold text-primary text-decoration-underline'
        >
          {' '}
          Sign up{' '}
        </Link>{' '}
      </p>
    </div>
  )
}

export default memo(SignupLink)
