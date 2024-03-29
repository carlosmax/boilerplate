const { name } = require('./package.json')

module.exports = {
  name,
  displayName: name,
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}', 
    '!<rootDir>/src/main/**/*', 
    '!<rootDir>/src/**/index.ts', 
    '!<rootDir>/**/*.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/cypress'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    ".+\\.(css|scss|png|jpg)$": 'jest-transform-stub'
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    ".+\\.(css|scss|png|jpg)$": 'jest-transform-stub'
  }
}
