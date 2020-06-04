/* eslint-disable sort-keys */

module.exports = {
  setupFiles: [ './tests/setup/setEnvironment.js' ],
  transform: {
    '^.+\\.ts?$': 'babel-jest'
  },
  moduleNameMapper: {
    // Jest needs to know about module aliasing as it doesn't run after webpack magic
    '^@handlers/(.*)$': '<rootDir>/src/handlers/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  }
}
