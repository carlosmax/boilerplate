import React, { memo } from 'react'
import { Logo } from '@/presentation/components'

import Background from './background'

const LoginAside: React.FC = () => {
  return (
    <div className={`login-aside text-center  d-flex flex-column flex-row-auto`}>
      <div className='d-flex flex-column-auto flex-column pt-lg-40 pt-15'>
        <div className='text-center mb-4 pt-5'>
          <Logo />
        </div>
        <h3 className='mb-2'>Welcome back!</h3>
        <p>
          User Experience & Interface Design <br />
          Strategy SaaS Solutions
        </p>
      </div>
      <Background></Background>
    </div>
  )
}

export default memo(LoginAside)
