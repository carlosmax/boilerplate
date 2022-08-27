import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { currentAccountState } from '@/presentation/components'
import { Landing, NotFound, RequestResetPassword } from '@/presentation/pages'
import { makeDashboard, makeForgetPassword, makeLogin, makeSignup } from './factories'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={makeLogin()} />
          <Route path='/signup' element={makeSignup()} />
          <Route path='/forgot-password' element={makeForgetPassword()} />
          <Route path='/request-reset-password' element={<RequestResetPassword />} />
          <Route path='/dashboard' element={makeDashboard()} />
          <Route path='/' element={<Landing />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
