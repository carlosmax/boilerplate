const { name } = require('./package.json')

module.exports = {
  name,
  displayName: name,
  roots: ['<rootDir>'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/errors/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1'
  }
}
