const nunjucks = require('nunjucks')

const env = nunjucks.configure(
  ['views'],
  { autoescape: true }
)

module.exports = env
