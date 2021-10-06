class CandleDataPoint {
  constructor ({ data: [timestamp, open, high, low, close, volume] }) {
    this.timestamp = timestamp
    this.ohlcv = [open, high, low, close, volume]
  }
}

class Candles {
  constructor ({ data: { series, symbol, timeframe } }) {
    this.series = series
    this.symbol = symbol
    this.timeframe = timeframe
  }
}

module.exports = {
  CandleDataPoint,
  Candles
}
