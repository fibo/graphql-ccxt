class Amount {
  constructor ({ data: { currency, value } }) {
    this.currency = currency
    this.value = value
  }
}

module.exports = {
  Amount
}
