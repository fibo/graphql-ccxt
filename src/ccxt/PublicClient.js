const { GraphQLError } = require('graphql')

const { Ticker } = require('../models/Ticker.js')
const { ccxtExchangeCapability } = require('./exchangeCapabilities')

class CcxtPublicClient {
  constructor ({ ccxtExchange, label }) {
    this.ccxtExchange = ccxtExchange
    this.label = label

    this.exchange = ccxtExchange.id
  }

  static timestmapDaysAgo (num) {
    if (typeof num === 'number') {
      return Math.floor(new Date().getTime() - 86400000 * num)
    }
  }

  _hasCapabilityOrThrow (capability) {
    if (this.ccxtExchange.has[capability]) {
      return capability
    } else {
      throw new GraphQLError(
        `Exchange ${this.exchange} has no '${capability}' capability`
      )
    }
  }

  _throwPrivateApiNotAvailable (capability) {
    throw new GraphQLError(
      `Private API '${capability}' not available on ${this.exchange} public client`
    )
  }

  async ticker ({ symbol }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchTicker
    )

    const data = await this.ccxtExchange[method](symbol)

    return new Ticker({ data })
  }

  async tickers ({ symbols }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchTickers
    )

    const data = await this.ccxtExchange[method](symbols)

    return Object.values(data).map((data) => new Ticker({ data }))
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
