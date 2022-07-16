export default {
  roots: ['<rootDir>/backend/src', '<rootDir>/frontend/src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/backend/src/**/*.ts', '<rootDir>/frontend/src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
}
