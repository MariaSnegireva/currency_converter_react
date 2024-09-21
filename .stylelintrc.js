module.exports = {
  plugins: [
    '@stylistic/stylelint-plugin',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
  ],
  rules: {
    "indentation": 2,
    "number-leading-zero": "always",
    "string-quotes": "double"
  },
};