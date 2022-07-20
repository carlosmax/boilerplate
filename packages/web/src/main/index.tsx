import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from '@/presentation/pages/login/login'

import '@/presentation/styles/main.scss'

const container = document.getElementById('main')
const root = ReactDOM.createRoot(container)

root.render(<Login></Login>)
