module.exports = ({ selectedScale, scales }) =>
  scales.map(scale => ({
    value: scale.name,
    label: scale.label,
    selected: scale.name === selectedScale
  }))