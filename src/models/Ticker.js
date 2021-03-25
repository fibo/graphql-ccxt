class Ticker {
  constructor ({ data: { symbol, last } }) {
    this.symbol = symbol
    this.last = last
  }
}

module.exports = {
  Ticker
}
