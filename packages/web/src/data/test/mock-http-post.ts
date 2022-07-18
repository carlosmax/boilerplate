import { faker } from '@faker-js/faker'
import { HttpPostClientParams } from '../protocols'

export const mockPostRequest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.words()
})
