const nunjucks = require('../../helpers/nunjucks')

const handler = async ({ event }) => {
  const html = nunjucks.render('pages/settings.njk', {
    pageTitle: 'Settings'
  })
  return {
    headers: {
      'Content-Type': 'text/html'
    },
    statusCode: 200,
    body: html
  }
}

module.exports = { handler }
