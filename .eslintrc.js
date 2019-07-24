module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
    // '@vue/airbnb',
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
    "comma-dangle": "off",
    "operator-linebreak": "off",
    "arrow-parens": "off"
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
