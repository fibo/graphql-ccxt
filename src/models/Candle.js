class Candle {
  constructor ({ data }) {
    this.ts = data[0]
    this.ohlcv = [data[1], data[2], data[3], data[4], data[5]]
  }
}

class CandlesSuccess {
  constructor (series, symbol, timeframe, timestamp, limit) {
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
