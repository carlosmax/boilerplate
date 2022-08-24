import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { currentAccountState } from '@/presentation/components'
import { makeDashboard } from './factories'
// import { makeLogin, makeSignup, makeDashboard } from './factories'
// import { NotFound } from '@/presentation/pages'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/login' element={makeLogin()} />
          <Route path='/signup' element={makeSignup()} />
          <Route path='/' element={makeDashboard()} />
           <Route path='*' element={<NotFound />} /> */}
          <Route path='/' element={makeDashboard()} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
