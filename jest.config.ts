import type { Config } from "jest";

const config: Config = {
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  clearMocks: false,
  resetMocks: true,
  restoreMocks: false,
  verbose: true,
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "tsx",
    "jsx",
    "json",
    "node"
  ],
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json"
      }
    ],
    "^.+\\.css$": "./config/jest/cssTransform.cjs",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "./config/jest/fileTransform.cjs"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  modulePaths: ["<rootDir>/src"]
};

export default config;
