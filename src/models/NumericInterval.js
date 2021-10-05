class NumericInterval {
  constructor ({ data: { min, max } }) {
    const hasMin = typeof min === 'number'
    const hasMax = typeof max === 'number'

    if (!hasMin && !hasMax) {
      throw new TypeError('NumericInterval must have at least a min or a max')
    }

    if (hasMin) {
      this.min = min
    }

    if (hasMax) {
      this.max = max
    }
  }

  static isNumericInterval (data) {
    return (
      data !== null &&
      typeof data === 'object' &&
      (typeof data.min === 'number' || typeof data.max === 'number')
    )
  }
}

module.exports = { NumericInterval }
