const hookpadColors = ['#fc0006', '#fda112', '#ebe509', '#1ccf02', '#3600ff', '#a700df', '#fb00bf']

const scales = [
  { name: 'major', intervals: [2, 2, 1, 2, 2, 2, 1], label: 'Major', colors: hookpadColors },
  { name: 'minor', intervals: [2, 1, 2, 2, 1, 2, 2], label: 'Minor', colors: hookpadColors.slice(5, 7).concat(hookpadColors.slice(0, 5)) },
  { name: 'ionian', intervals: [2, 2, 1, 2, 2, 2, 1], label: 'Ionian', colors: hookpadColors },
  { name: 'dorian', intervals: [2, 1, 2, 2, 2, 1, 2], label: 'Dorian', colors: hookpadColors.slice(1, 7).concat(hookpadColors.slice(0, 1)) },
  { name: 'phrygian', intervals: [1, 2, 2, 2, 1, 2, 2], label: 'Phrygian', colors: hookpadColors.slice(2, 7).concat(hookpadColors.slice(0, 2)) },
  { name: 'lydian', intervals: [2, 2, 2, 1, 2, 2, 1], label: 'Lydian', colors: hookpadColors.slice(3, 7).concat(hookpadColors.slice(0, 3)) },
  { name: 'mixolydian', intervals: [2, 2, 1, 2, 2, 1, 2], label: 'Mixolydian', colors: hookpadColors.slice(4, 7).concat(hookpadColors.slice(0, 4)) },
  { name: 'aeolian', intervals: [2, 1, 2, 2, 1, 2, 2], label: 'Aeolian', colors: hookpadColors.slice(5, 7).concat(hookpadColors.slice(0, 5)) },
  { name: 'locrian', intervals: [1, 2, 2, 1, 2, 2, 2], label: 'Locrian', colors: hookpadColors.slice(6, 7).concat(hookpadColors.slice(0, 6)) },
]
const tonics = [
  { name: 'C', label: { regular: 'C' }, modulo: 0 },
  { name: 'C#', label: { regular: 'C# / Db', sharp: 'C#', flat: 'Db' }, modulo: 1 },
  { name: 'D', label: { regular: 'D' }, modulo: 2 },
  { name: 'D#', label: { regular: 'D# / Eb', sharp: 'D#', flat: 'Eb' }, modulo: 3 },
  { name: 'E', label: { regular: 'E' }, modulo: 4 },
  { name: 'F', label: { regular: 'F' }, modulo: 5 },
  { name: 'F#', label: { regular: 'F# / Gb', sharp: 'F#', flat: 'Gb' }, modulo: 6 },
  { name: 'G', label: { regular: 'G' }, modulo: 7 },
  { name: 'G#', label: { regular: 'G# / Ab', sharp: 'G#', flat: 'Ab' }, modulo: 8 },
  { name: 'A', label: { regular: 'A' }, modulo: 9 },
  { name: 'A#', label: { regular: 'A# / Bb', sharp: 'A#', flat: 'Bb' }, modulo: 10 },
  { name: 'B', label: { regular: 'B' }, modulo: 11 }
]

module.exports = {
  cookies: {
    display: {
      name: 'display',
      defaultValue: { type: 'hookpad' }
    },
    instrument: {
      name: 'instrument',
      defaultValue: { strings: [48, 43, 38, 33, 28, 23], frets: 24, scaleLength: 26 }
    },
    scale: {
      name: 'scale',
      defaultValue: { name: 'major', tonic: 'C' }
    }
  },
  scales,
  server: {
    host: 'localhost',
    port: 5000,
  },
  tonics
}
