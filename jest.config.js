// https://jestjs.io/docs/en/configuration.html
module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover",
    "text-summary"
  ],
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  preset: 'ts-jest',
  roots: [
    "<rootDir>"
  ],
  runner: "jest-runner",
  testEnvironment: "node",
  testLocationInResults: true,
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "<rootDir>/test/**/?(*.)(spec|test).ts?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.docz/",
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', 'babel-jest']
  },
  transformIgnorePatterns: [
    "/node_modules/",
  ],
  verbose: true,
};
