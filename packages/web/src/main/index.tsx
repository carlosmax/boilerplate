import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'

import '@/presentation/styles/global.scss'

const container = document.getElementById('main')
const root = ReactDOM.createRoot(container)

root.render(<Router></Router>)
