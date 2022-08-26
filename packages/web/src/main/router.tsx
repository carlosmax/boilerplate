import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { currentAccountState } from '@/presentation/components'
import { Landing } from '@/presentation/pages'
import { makeDashboard, makeLogin, makeSignup } from './factories'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
          {/* 
           <Route path='*' element={<NotFound />} /> */}
          <Route path='/dashboard' element={makeDashboard()} />
          <Route path='/login' element={makeLogin()} />
          <Route path='/signup' element={makeSignup()} />
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
