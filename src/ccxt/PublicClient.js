const { GraphQLError } = require('graphql')

const { Ticker } = require('../models/Ticker.js')
const { ccxtClientCapability } = require('./clientCapabilities')

class CcxtPublicClient {
  constructor ({ ccxtClient, key }) {
    this.ccxtClient = ccxtClient
    this.key = key
    this.exchange = ccxtClient.id
  }

  _hasCapabilityOrThrow (capability) {
    if (this.ccxtClient.has[capability]) {
      return capability
    } else {
      throw new GraphQLError(
        `Exchange ${this.exchange} has no "${capability}" capability`
      )
    }
  }

  async ticker ({ symbol }) {
    const method = this._hasCapabilityOrThrow(ccxtClientCapability.fetchTicker)

    const data = await this.ccxtClient[method](symbol)

    return new Ticker({ data })
  }

  async tickers ({ symbols }) {
    const method = this._hasCapabilityOrThrow(ccxtClientCapability.fetchTickers)

    const data = await this.ccxtClient[method](symbols)

    return Object.values(data).map((data) => new Ticker({ data }))
  }
}

module.exports = { CcxtPublicClient }
