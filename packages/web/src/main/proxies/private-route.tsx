import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { currentAccountState } from '@/presentation/components'

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const location = useLocation()

  return getCurrentAccount()?.accessToken ? (
    children
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default PrivateRoute
