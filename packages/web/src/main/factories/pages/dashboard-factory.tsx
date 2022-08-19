import React, { ReactElement } from 'react'
import { Dashboard } from '@/presentation/pages'
import { PrivateRoute } from '@/main/proxies'

export const makeDashboard = (): ReactElement<any, any> => {
  return (
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  )
}
