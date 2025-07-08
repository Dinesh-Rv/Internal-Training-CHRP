const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

const coverageFileOutput = process.env.ENABLE_COVERAGE_FILE_OUTPUT === 'true';

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: [
    'src/config/**/*.{ts,js}',
    'src/controllers/**/*.{ts,js}',
    'src/models/**/*.{ts,js}',
    'src/routes/**/*.{ts,js}',
    'src/services/**/*.{ts,js}',
    'src/Repositories/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
};