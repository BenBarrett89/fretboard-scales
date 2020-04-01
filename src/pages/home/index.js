const nunjucks = require('../../helpers/nunjucks')


const getDistanceFromNut = require('../../helpers/getDistanceFromNut')
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

  // Scale
  const scalesDropdown = {
    name: 'scale',
    options: getScalesDropdownOptions({ selectedScale: state.scale.name, scales: constants.scales }),
    submitOnChange: true,
  }
  const tonicsDropdown = {
    name: 'tonic',
    options: getTonicsDropdownOptions({ selectedTonic: state.scale.tonic, tonics: constants.tonics }),
    submitOnChange: true,
  }

  // Fretboard
  const fretboardSize = 1500
  const frets = Array(state.instrument.frets)
    .fill({})
    .map((_, index) => ({ fretNumber: index + 1, distanceFromNut: getDistanceFromNut({ scaleLength: state.instrument.scaleLength, fretNumber: index + 1 }) }))
    .map((fret, index, frets) => {
      const previousDistance = index === 0 ? 0 : frets[index - 1].distanceFromNut
      return Object.assign(fret, {}, {
        fretSize: fret.distanceFromNut - previousDistance
      })
    })
    .reduce((_, fret, index, frets) => {
      if (index + 1 === frets.length) {
        const scale = fret.distanceFromNut
        return frets.map(fret => {
          const widthPercentage = (fret.fretSize / scale) * 100
          return Object.assign(fret, {}, {
            widthPercentage,
            size: widthPercentage * (fretboardSize / 100)
          })
        })
      }
    }, [])

  const html = nunjucks.render('pages/home.njk', {
    pageTitle: 'Home',
    fretboardParams: {
      frets,
      size: fretboardSize
    },
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
