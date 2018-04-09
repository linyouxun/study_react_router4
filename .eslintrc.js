const eslintrc = {
  extends: ['eslint-config-airbnb'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    'markdown',
    'react',
    'babel',
  ],
  rules: {
    'func-names': 0,
    'arrow-body-style': 0,
    'class-methods-use-this': 0,
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.md'] }],
    'import/extensions': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'prefer-destructuring': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'max-len': 0,
    'consistent-return': 0,
    'no-redeclare': 0,
    'react/require-extension': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/no-danger': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'function-paren-newline': 0,
    'object-curly-newline': 0,
    'no-restricted-globals': 0,
    'linebreak-style': 0,
    'no-extra-boolean-cast': 0,
    'no-plusplus': 0,
    'no-bitwise': 0
  },
};

if (process.env.RUN_ENV === 'development') {
  // eslintrc.globals = {
  //   React: true,
  //   ReactDOM: true,
  //   mountNode: true,
  // };

  Object.assign(eslintrc.rules, {
    // indent: 0,
    'no-console': 1,
    // 'no-plusplus': 0,
    // 'eol-last': 0,
    // 'prefer-rest-params': 0,
    // 'react/no-multi-comp': 0,
    // 'react/prefer-stateless-function': 0,
    // 'jsx-a11y/href-no-hash': 0,
    // 'import/newline-after-import': 0,
  });
}

module.exports = eslintrc;
