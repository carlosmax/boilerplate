import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'
import { currentAccountState } from '@/presentation/components'
import { makeLogin } from './factories'

const Router: React.FC = () => {
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter
  }

  return (
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={makeLogin()} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router
