import { PublicRoute } from '@/main/proxies'
import { renderWithHistory } from '@/presentation/test'
import { mockAccountModel } from '@/domain/test'

import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/login'] })
  renderWithHistory({ history, Page: PublicRoute, account })
  return { history }
}

describe('PublicRoute', () => {
  test('Should redirect to / if token is not empty', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/')
  })

  test('Should render current component if token is empty', () => {
    const { history } = makeSut(null)

    expect(history.location.pathname).toBe('/login')
  })
})
