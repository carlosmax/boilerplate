import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { currentAccountState } from '@/presentation/components'

const PublicRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)

  return getCurrentAccount()?.accessToken ? <Navigate to='/dashboard' /> : children
}

export default PublicRoute
