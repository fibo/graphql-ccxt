class CandleDataPoint {
  constructor ({ data: [timestamp, open, high, low, close, volume] }) {
    this.timestamp = timestamp
    this.open = open
    this.high = high
    this.low = low
    this.close = close
    this.volume = volume
    this.ohlcv = [open, high, low, close, volume]
  }
}

class Candles {
  constructor ({ data, symbol, start, timeframe }) {
    this.series = data.map((item) => new CandleDataPoint({ data: item }))
    this.start = start
    this.symbol = symbol
    this.timeframe = timeframe
  }
}

module.exports = {
  Candles
}
