import { faker } from '@faker-js/faker'

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.intercept(
    {
      method: 'POST',
      url
    },
    {
      statusCode: 401,
      body: {
        error: faker.random.words()
      }
    }
  ).as('request')
}

export const mockForbiddenError = (url: RegExp, method: string): void => {
  cy.intercept(
    {
      method,
      url
    },
    {
      statusCode: 403,
      body: {
        error: faker.random.words()
      }
    }
  ).as('request')
}

export const mockServerError = (url: RegExp, method: string, statusCode: number): void => {
  cy.intercept(
    {
      method,
      url
    },
    {
      statusCode,
      body: {
        error: faker.random.words()
      }
    }
  ).as('request')
}

export const mockOk = (
  url: RegExp,
  method: string,
  fixture: string,
  alias: string = 'request'
): void => {
  cy.intercept(
    {
      method,
      url
    },
    {
      statusCode: 200,
      fixture
    }
  ).as(alias)
}

export const mockUnexpectedError = (url: RegExp, method: string, statusCode: number): void =>
  mockServerError(url, method, statusCode)

export const mockInvalidCredentialsError = (url: RegExp): void => mockUnauthorizedError(url)
