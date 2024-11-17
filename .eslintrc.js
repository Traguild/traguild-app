module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',

    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    'react/prop-types': 'warn', // PropTypes 사용 여부 경고
    'react-native/no-unused-styles': 'error', // 사용되지 않는 스타일 경고
    'react-native/no-inline-styles': 'warn', // 인라인 스타일 사용 경고
    'react-native/no-raw-text': 'warn', // 텍스트 컴포넌트 외부의 문자열 경고

    'prettier/prettier': 'error',
  },
};
