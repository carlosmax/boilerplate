import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const LoginLink: React.FC = () => {
  return (
    <div className='mt-4 text-center'>
      <p className='mb-0'>
        Já possui uma conta?{' '}
        <Link
          data-testid='login-link'
          to='/login'
          className='fw-semibold text-primary text-decoration-underline'
        >
          Entrar
        </Link>
      </p>
    </div>
  )
}

export default memo(LoginLink)
