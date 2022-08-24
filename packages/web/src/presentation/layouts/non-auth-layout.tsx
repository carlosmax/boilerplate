import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { WithRouter } from '@/main/proxies'

import { layoutState } from '@/presentation/components/velzon'

type Props = {
  children: any
}

const NonAuthLayout: React.FC<Props> = ({ children }) => {
  const [layout] = useRecoilState(layoutState)

  useEffect(() => {
    if (layout.layoutModeType === 'dark') {
      document.body.setAttribute('data-layout-mode', 'dark')
    } else {
      document.body.setAttribute('data-layout-mode', 'light')
    }
  }, [layout.layoutModeType])
  return <div>{children}</div>
}

export default WithRouter(NonAuthLayout)
