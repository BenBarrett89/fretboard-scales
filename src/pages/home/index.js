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

  const scaleObject = constants.scales.find(scale => scale.name === state.scale.name)
  const tonicObject = constants.tonics.find(tonic => tonic.name === state.scale.tonic)

  const scaleNotes = scaleObject.intervals
    .reduce((notes, interval, index, intervals) => {
      const distanceFromTonic = intervals.slice(0, index + 1).reduce((total, interval) => total + interval, 0)
      const modulo = (tonicObject.modulo + distanceFromTonic) % 12
      return modulo === tonicObject.modulo
        ? notes
        : notes.concat({
          distanceFromTonic,
          degree: index + 2,
          color: scaleObject.colors[index + 1],
          ...constants.tonics.find(tonic => tonic.modulo === modulo),
          inScale: true
        })
    }, [{
      distanceFromTonic: 0,
      degree: 1,
      color: scaleObject.colors[0],
      ...tonicObject,
      inScale: true
    }])

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

  const strings = state.instrument.strings
    .map((string, stringIndex) => [{
      string: stringIndex,
      inScale: false,
      open: true,
      noteNumber: string,
      modulo: string % 12,
      octave: Math.floor(string / 12) - 1,
      ...constants.tonics.find(tonic => tonic.modulo === (string % 12)),
      ...frets[frets.length - 1],
      fretNumber: 0,
      ...scaleNotes.find(note => note.modulo === (string % 12))
    }].concat(frets.map((fret, fretIndex) => {
      const noteNumber = (string + fretIndex + 1)
      const modulo = noteNumber % 12
      const octave = Math.floor(noteNumber / 12) - 1
      const note = constants.tonics.find(tonic => tonic.modulo === modulo)
      const scaleNote = scaleNotes.find(note => note.modulo === modulo)
      return {
        inScale: false,
        string: stringIndex,
        fret: fretIndex + 1,
        noteNumber,
        modulo,
        octave,
        ...note,
        ...fret,
        ...scaleNote
      }
    })))

  const html = nunjucks.render('pages/home.njk', {
    pageTitle: 'Home',
    fretboardParams: {
      strings,
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
