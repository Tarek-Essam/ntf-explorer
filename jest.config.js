const { defaults: tsjPreset } = require('ts-jest/presets');
// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  setupFiles: [],
  testTimeout: 300000,
  testRegex: '/.*.(test|spec).ts$',
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__mocks__/',
    '<rootDir>/node_modules/',
    '<rootDir>/prod_node_modules/',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  transform: {
    ...tsjPreset.transform,
  },
  collectCoverage: false,
  coverageReporters: ['json', 'html'],
  modulePathIgnorePatterns: ['<rootDir>/prod_node_modules', '<rootDir>/dist/'],
  verbose: false,
  resetModules: false
};
