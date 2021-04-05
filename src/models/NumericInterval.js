class NumericInterval {
  constructor ({ data: { min, max } }) {
    const hasMin = typeof min === 'number'
    const hasMax = typeof max === 'number'

    if (!hasMin && !hasMax) {
      throw new TypeError('NumericInterval must have at least a min or a max')
    }

    if (hasMin) {
      Object.defineProperty(this, 'min', { value: min })
    }

    if (hasMax) {
      Object.defineProperty(this, 'max', { value: max })
    }
  }
}

module.exports = { NumericInterval }
