import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const LoginLink: React.FC = () => {
  return (
    <div className='new-account mt-3'>
      <p>
        Already have an account?{' '}
        <Link data-testid='login-link' to='/login' className='text-primary'>
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default memo(LoginLink)
