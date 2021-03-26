const { GraphQLError } = require('graphql')

const { Ticker } = require('../models/Ticker.js')
const { ccxtExchangeCapability } = require('./exchangeCapabilities')

class CcxtPublicClient {
  constructor ({ ccxtExchange, label }) {
    this.ccxtExchange = ccxtExchange
    this.label = label

    this.exchange = ccxtExchange.id
  }

  _hasCapabilityOrThrow (capability) {
    if (this.ccxtExchange.has[capability]) {
      return capability
    } else {
      throw new GraphQLError(
        `Exchange ${this.exchange} has no "${capability}" capability`
      )
    }
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
}

module.exports = { CcxtPublicClient }
