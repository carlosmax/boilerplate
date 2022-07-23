module.exports = {
  verbose: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.{ts,tsx}']
}
