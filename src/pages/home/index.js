const nunjucks = require('../../helpers/nunjucks')

const getScalesDropdownOptions = require('../../helpers/getScalesDropdownOptions')
const getTonicsDropdownOptions = require('../../helpers/getTonicsDropdownOptions')

const handler = async ({ constants, event }) => {
  let cookies = []
  let state = event.state

  if (event.body && event.body.form === 'scale') {
    console.log(`Updating scale to ${event.body.tonic} ${event.body.scale.substring(0, 1).toUpperCase()}${event.body.scale.substring(1)}`)
    const newScale = {
      name: event.body.scale,
      tonic: event.body.tonic
    }
    cookies = cookies.concat({
      name: 'scale',
      value: newScale
    })
    state = Object.assign(state, {}, { scale: newScale })
  }

  const scalesDropdown = {
    name: 'scale',
    options: getScalesDropdownOptions({ selectedScale: state.scale.name, scales: constants.scales })
  }
  const tonicsDropdown = {
    name: 'tonic',
    options: getTonicsDropdownOptions({ selectedTonic: state.scale.tonic, tonics: constants.tonics })
  }

  const html = nunjucks.render('pages/home.njk', {
    pageTitle: 'Home',
    scalesDropdown,
    tonicsDropdown
  })

  return {
    cookies,
    headers: {
      'Content-Type': 'text/html'
    },
    statusCode: 200,
    body: html
  }
}

module.exports = { handler }
