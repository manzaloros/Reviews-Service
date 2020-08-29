module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // 'linebreak-style': 0,
    'no-console': 'off',
    // 'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': 0,
    // 'no-shadow': 0,
    // 'import/extensions': 0,
  },
};
