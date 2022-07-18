import { Router } from 'express'

export default (router: Router): void => {
  router.get('/test-route', (req, res) => {
    res.json({ message: 'ok!' })
  })
}
