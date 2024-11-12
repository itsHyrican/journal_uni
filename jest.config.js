module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-localstorage-mock'],
  testMatch: ['**/__tests__/**/*.ts'],
};
