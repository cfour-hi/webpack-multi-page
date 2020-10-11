module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'import/no-extraneous-dependencies': 0,
  },
  settings: {
    'import/resolver': {
      alias: [['lib', './lib']],
    },
  },
  globals: {
    $: 'readonly',
  },
};
