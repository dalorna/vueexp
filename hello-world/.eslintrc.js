// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', {'named':'ignore'}],
    'indent': ['off', 2, {
      'SwitchCase': 1,
      'VariableDeclarator': 1,
      'outerIIFEBody': 1,
      'MemberExpression': 1,
      'FunctionDeclaration': { parameters: 1, body: 1 },
      'FunctionExpression': { parameters: 1, body: 1 },
      'CallExpression': { arguments: 1 },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 4,
      'flatTernaryExpressions': false,
      'ignoreComments': false
    }],
    'no-unused-vars': 'off',
    'function-paren-newline': 'off'
  }
}
