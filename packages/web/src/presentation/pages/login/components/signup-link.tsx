import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const SignupLink: React.FC = () => {
  return (
    <div className='new-account mt-3'>
      <p>
        {"Don't have an account?"}{' '}
        <Link data-testid='signup' to='/signup' className='text-primary'>
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default memo(SignupLink)
