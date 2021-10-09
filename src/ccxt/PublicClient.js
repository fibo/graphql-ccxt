const { GraphQLError } = require('graphql')

const { ccxtExchangeCapability } = require('./exchangeCapabilities.js')

class CcxtPublicClient {
  constructor ({ ccxtExchange, label }) {
    Object.defineProperty(this, 'ccxtExchange', { value: ccxtExchange })
    this.label = label

    Object.defineProperty(this, 'exchange', { get: () => ccxtExchange.id })
    Object.defineProperty(this, 'lastLoadMarkets', {
      value: 0,
      writable: true,
      configurable: false
    })
  }

  _hasCapabilityOrThrow (capability) {
    this._throwIfMarketsNotLoaded()

    if (this.ccxtExchange.has[capability]) {
      return capability
    }

    throw new GraphQLError(
      `Exchange '${this.exchange}' has no '${capability}' capability`
    )
  }

  _hasTimeframeOrThrow (timeframe) {
    this._throwIfMarketsNotLoaded()

    const timeframes = this.ccxtExchange.timeframes

    if (!timeframes[timeframe]) {
      throw new GraphQLError(
        `Exchange '${
          this.exchange
        }' has no '${timeframe}' timeframe. Available timeframes are: ${Object.keys(
          timeframes
        ).join()}`
      )
    }
  }

  _throwIfMarketsNotLoaded () {
    if (!this.lastLoadMarkets) {
      throw new Error(
        `Cannot use graphql-ccxt client on exchange '${this.exchange}', async method loadMarkets() was not called`
      )
    }
  }

  _throwPrivateApiNotAvailable (capability) {
    throw new GraphQLError(
      `Private API '${capability}' not available on ${this.exchange} public client`
    )
  }

  millisecondsDaysAgo (num) {
    if (typeof num === 'number') {
      return this.ccxtExchange.milliseconds() - 86400000 * num
    }
  }

  async loadMarkets () {
    await this.ccxtExchange.loadMarkets()

    this.lastLoadMarkets = this.ccxtExchange.milliseconds()
  }

  markets ({ filter } = {}) {
    // TODO could use lastLoadMarkets to reload data based on a configured cache timeout
    const loadedMarkets = this.ccxtExchange.markets

    const hasFilters = typeof filter === 'object'

    return Object.values(loadedMarkets)
      .filter((data) => {
        if (hasFilters && typeof filter.active === 'boolean') {
          return data.active === filter.active
        } else {
          return true
        }
      })
      .filter((data) => {
        if (hasFilters && typeof filter.base === 'string') {
          return data.base === filter.base
        } else {
          return true
        }
      })
      .filter((data) => {
        if (hasFilters && typeof filter.quote === 'string') {
          return data.quote === filter.quote
        } else {
          return true
        }
      })
  }

  async ticker ({ symbol }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchTicker
    )

    const data = await this.ccxtExchange[method](symbol)

    return data
  }

  async tickers ({ symbols }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchTickers
    )

    const data = await this.ccxtExchange[method](symbols)

    return Object.values(data)
  }

  timeframes () {
    // timeframes are available for clients with fetchOHLCV capability
    this._hasCapabilityOrThrow(ccxtExchangeCapability.fetchOHLCV)

    return Object.keys(this.ccxtExchange.timeframes)
  }

  async candles ({ symbol, timeframe, start, limit }) {
    const method = this._hasCapabilityOrThrow(ccxtExchangeCapability.fetchOHLCV)
    this._hasTimeframeOrThrow(timeframe)

    const data = await this.ccxtExchange[method](
      symbol,
      timeframe,
      // Need to use a String for start timestamp otherwise GraphQL will complain with error
      //     Int cannot represent non 32-bit signed integer value
      parseInt(start),
      limit
    )

    const series = data.map(([timestamp, open, high, low, close, volume]) => ({
      timestamp,
      open,
      high,
      low,
      close,
      volume,
      ohlcv: [open, high, low, close, volume]
    }))

    return {
      symbol,
      timeframe,
      start,
      series
    }
  }

  // Follows private APIs, not allowed on public client.

  closedOrders () {
    this._throwPrivateApiNotAvailable(ccxtExchangeCapability.fetchClosedOrders)
  }

  createOrder () {
    this._throwPrivateApiNotAvailable(ccxtExchangeCapability.createOrder)
  }

  openOrders () {
    this._throwPrivateApiNotAvailable(ccxtExchangeCapability.fetchOpenOrders)
  }
}

module.exports = { CcxtPublicClient }
