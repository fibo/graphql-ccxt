class Amount {
  constructor ({ data: { currency, value } }) {
    Object.defineProperties(this, {
      currency: { value: currency },
      value: { value: value }
    })
  }
}

module.exports = {
  Amount
}
