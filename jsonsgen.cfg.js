module.exports = {
  from: './src',
  to: './dist',
  tsgen: {
    enabled: true,
    to: './dist/types',
    prefix: '',
    postfix: '.schema',
    options: { // Docs: https://www.npmjs.com/package/json-schema-to-typescript#options
      bannerComment: '',
    },
  }
}