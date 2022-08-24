import { AccountModel } from '@/domain/models'

import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: null as () => AccountModel,
    setCurrentAccount: null as (account: AccountModel) => void
  }
})

export const sideBarStyleState = atom({
  key: 'sideBarStyleState',
  default: {
    value: 'full',
    label: 'Full'
  }
})

export const menuToggleState = atom({
  key: 'menuToggleState',
  default: false
})
