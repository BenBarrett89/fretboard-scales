module.exports = ({ selectedTonic, tonics }) =>
  tonics.map(tonic => ({
    value: tonic.name,
    label: tonic.label.regular,
    selected: tonic.name === selectedTonic
  }))