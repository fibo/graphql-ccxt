class Ticker {
  constructor ({ data: { symbol, last } }) {
    Object.defineProperties(this, {
      symbol: { value: symbol },
      last: { value: last }
    })
  }
}

module.exports = {
  Ticker
}
