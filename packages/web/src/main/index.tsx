import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'

import '@/presentation/assets/scss/themes.scss'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<Router></Router>)
