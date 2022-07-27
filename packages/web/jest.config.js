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
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/cypress'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx|js|jsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.scss': 'identity-obj-proxy'
  }
}
