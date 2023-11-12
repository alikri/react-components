/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/context/**',
    '!**/vendor/**',
    '!**/constants/**',
    '!**/localStorage/**',
    '!**/errorButton/**',
    '!**/errorBoundary/**',
    '!**/mainContent/**',
    '!**/pageLimit/**',
    '!**/paginator/**',
    '!**/src/App.tsx/**',
    '!**/src/main.tsx/**',
    '!**/search/**',
    '!**/pages/**',
    '!**/NotFound/**',
    '!**/dist/**',
    '!**/utils/**',
    '!**/coverage/**',
    '!**/*.config.js',
    '!**/*.config.ts',
    '!**/*src/setupTests.ts',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  reporters: ['default', 'jest-junit'],
  coverageProvider: 'v8',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/.husky/'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/mock.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};

export default config;
