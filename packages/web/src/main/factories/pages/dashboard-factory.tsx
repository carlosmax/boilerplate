import React, { ReactElement } from 'react'
import { Dashboard } from '@/presentation/pages'
import Layout from '@/presentation/layouts'
import { PrivateRoute } from '@/main/proxies'

export const makeDashboard = (): ReactElement<any, any> => {
  return (
    <PrivateRoute>
      <Layout>
        <Dashboard />
      </Layout>
    </PrivateRoute>
  )
}
