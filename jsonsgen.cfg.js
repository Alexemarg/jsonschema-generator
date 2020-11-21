module.exports = {
  from: './src',
  to: './dist',
  tsgen: { // Requires "json-schema-to-typescript" module
    enabled: true,
    to: './dist/types',
    prefix: '',
    postfix: '.schema',
    // options: {}, // Docs: https://www.npmjs.com/package/json-schema-to-typescript#options
  },
}