/** @type {import('ts-jest').JestConfigWithTsJest} */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Proporciona la ruta a tu aplicación Next.js para cargar next.config.js y archivos .env
  dir: './',
});

// Configuración personalizada de Jest
const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Mapeo para alias de rutas
    '^@/(.*)$': '<rootDir>/$1',
    // Mapeo para archivos estáticos
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/.github/',
    '<rootDir>/coverage/',
    '<rootDir>/public/',
  ],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/public/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // Configuración específica para módulos de CSS
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Configuración para transformar módulos de CSS
  transformIgnorePatterns: [
    '/node_modules/(?!(react-syntax-highlighter|swiper|ssr-window|dom7)/)',
  ],
};

// createJestConfig se exporta de esta manera para asegurar que next/jest puede cargar la configuración de Next.js
module.exports = createJestConfig(customJestConfig);
