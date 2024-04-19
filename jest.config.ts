import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  roots: ["<rootDir>/plugin"],
  collectCoverageFrom: ["plugin/**/*.{js,jsx,ts,tsx}", "!plugin/**/*.d.ts"],
  testMatch: [
    "<rootDir>/plugin/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/plugin/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  testEnvironment: "node",
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: 'plugin/tsconfig.json',
      }
    ]
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$"
  ],
  modulePaths: ["<rootDir>/plugin"],
  moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "json", "node"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  clearMocks: false,
  resetMocks: true,
  restoreMocks: false,
  verbose: true
};

export default config;
