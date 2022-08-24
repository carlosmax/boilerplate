import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navdata = (): any => {
  const navigate = useNavigate()
  // state data
  const [isDashboard, setIsDashboard] = useState(false)

  const [iscurrentState, setIscurrentState] = useState('Dashboard')

  function updateIconSidebar(e?: any): void {
    if (e?.target?.getAttribute('subitems')) {
      const ul = document.getElementById('two-column-menu')
      const iconItems = ul.querySelectorAll('.nav-icon.active')
      const activeIconItems = [...iconItems]
      activeIconItems.forEach(item => {
        item.classList.remove('active')
        const id = item.getAttribute('subitems')
        if (document.getElementById(id)) document.getElementById(id).classList.remove('show')
      })
    }
  }

  useEffect(() => {
    document.body.classList.remove('twocolumn-panel')
    if (iscurrentState !== 'Dashboard') {
      setIsDashboard(false)
    }
  }, [navigate, iscurrentState, isDashboard])

  const menuItems = [
    {
      label: 'Menu',
      isHeader: true
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'ri-dashboard-2-line',
      link: '/',
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault()
        setIsDashboard(!isDashboard)
        setIscurrentState('Dashboard')
        updateIconSidebar(e)
      }
    }
  ]
  return <>{menuItems}</>
}
export default Navdata
