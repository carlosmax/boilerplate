export default {
  roots: ['<rootDir>/packages/backend/src', '<rootDir>/packages/frontend/src'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/packages/backend/src/**/*.ts',
    '<rootDir>/packages/frontend/src/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
