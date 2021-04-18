class Candle {
  constructor ({ data: [timestamp, open, high, low, close, volume] }) {
    this.timestamp = timestamp
    this.ohlcv = [open, high, low, close, volume]
  }
}

class CandlesSuccess {
  constructor ({ data: { series, symbol, timeframe, timestamp, limit } }) {
    this.series = series
    this.symbol = symbol
    this.timeframe = timeframe
    this.timestamp = timestamp
    this.limit = limit
  }

  get __typename () {
    return 'CandlesSuccess'
  }
}

class CandlesError {
  constructor (error) {
    this.message = error.message
  }

  get __typename () {
    return 'CandlesError'
  }
}

module.exports = {
  Candle,
  CandlesSuccess,
  CandlesError
}
