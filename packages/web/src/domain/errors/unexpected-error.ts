export class UnexpectedError extends Error {
  constructor() {
    super('Ocorreu um erro inesperado. Tente novamente em alguns instantes.')
    this.name = 'UnexpectedError'
  }
}
