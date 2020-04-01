module.exports = {
  cookies: {
    display: {
      name: 'display',
      defaultValue: { type: 'hookpad' }
    },
    instrument: {
      name: 'instrument',
      defaultValue: { strings: [48, 43, 38, 33, 28, 23], frets: 24 }
    },
    scale: {
      name: 'scale',
      defaultValue: { name: 'major', tonic: 'C' }
    }
  },
  server: {
    host: 'localhost',
    port: 5000,
  }
}