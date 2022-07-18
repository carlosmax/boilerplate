const { name } = require('./package.json')

module.exports = {
  name,
  displayName: name,
  rootDir: '../..',
  roots: ['<rootDir>/packages/web/src'],
  collectCoverageFrom: [
    '<rootDir>/packages/web/src/**/*.{ts,tsx}', 
    '!<rootDir>/packages/web/src/main/**/*', 
    '!<rootDir>/packages/web/src/**/index.ts', 
    '!<rootDir>/packages/web/**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/packages/web/node_modules/'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/packages/web/src/$1'
  }
}
