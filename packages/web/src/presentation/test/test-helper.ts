import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const testElementText = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

export const testButtonIsDisabled = (fieldName: string, isDisable: boolean): void => {
  const button = screen.getByTestId<HTMLButtonElement>(fieldName)
  expect(button.disabled).toBe(isDisable)
}

export const buttonClick = (fieldName: string): void => {
  const button = screen.getByTestId<HTMLButtonElement>(fieldName)
  fireEvent.click(button)
}
