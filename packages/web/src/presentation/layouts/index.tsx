import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useRecoilState } from 'recoil'

import { WithRouter } from '@/main/proxies'
import { layoutState } from '@/presentation/components/velzon'

// import Components
import Header from './Header'
import Sidebar from './sidebar'
import Footer from './Footer'

const Layout = (props: any): JSX.Element => {
  const [headerClass, setHeaderClass] = useState('')
  const [layout, setLayout] = useRecoilState(layoutState)

  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value: any): void => {
    setLayout({ ...layout, layoutModeType: value })
  }

  const changeHTMLAttribute = (attribute: string, value: string): boolean => {
    if (document.documentElement) document.documentElement.setAttribute(attribute, value)
    return true
  }

  useEffect(() => {
    changeHTMLAttribute('data-layout-mode', layout.layoutModeType)
  }, [layout.layoutModeType])

  // class add remove in header
  useEffect(() => {
    window.addEventListener('scroll', scrollNavigation, true)
  })

  function scrollNavigation(): void {
    const scrollup = document.documentElement.scrollTop
    if (scrollup > 50) {
      setHeaderClass('topbar-shadow')
    } else {
      setHeaderClass('')
    }
  }

  return (
    <React.Fragment>
      <div id='layout-wrapper'>
        <Header
          headerClass={headerClass}
          layoutModeType={layout.layoutModeType}
          onChangeLayoutMode={onChangeLayoutMode}
        />
        <Sidebar layoutType={layout.layoutType} />
        <div className='main-content'>
          {props.children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.object
}

export default WithRouter(Layout)
