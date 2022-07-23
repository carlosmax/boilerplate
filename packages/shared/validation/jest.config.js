const { name } = require('./package.json')

module.exports = {
  name,
  displayName: name,
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    '<rootDir>/**/*.ts', 
    '!<rootDir>/**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1'
  }
}
