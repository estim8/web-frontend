module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'indent': 0,
    'max-len': 0,
    "quotes": ["off", "double"],
    "no-tabs": 0,
    "import/prefer-default-export" : "warn",
    "no-unused-vars": "warn",
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
