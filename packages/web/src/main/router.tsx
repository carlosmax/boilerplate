import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { makeLogin } from './factories'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={makeLogin()} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
