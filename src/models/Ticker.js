class Ticker {
  constructor ({
    data: {
      symbol,
      last,
      open,
      close,
      high,
      low,
      bid,
      ask,
      vwap,
      percentage,
      change
    }
  }) {
    this.symbol = symbol
    this.last = last
    this.open = open
    this.high = high
    this.close = close
    this.low = low
    this.bid = bid
    this.ask = ask
    this.vwap = vwap
    this.percentage = percentage
    this.change = change
  }
}

module.exports = {
  Ticker
}
