const { GraphQLError } = require('graphql')

const { Ticker } = require('../types/Ticker.js')
const { clientCapability } = require('./clientCapabilities')

class PublicClient {
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

  _throwPrivateCapabilityNotAvailable (capability) {
    throw GraphQLError(`Public client has no "${capability}" capability`)
  }

  balance () {
    this._throwPrivateCapabilityNotAvailable(clientCapability.fetchBalance)
  }

  async ticker ({ symbol }) {
    const method = this._hasCapabilityOrThrow(clientCapability.fetchTicker)

    const data = await this.ccxtClient[method](symbol)

    return new Ticker(data)
  }

  async tickers ({ symbols }) {
    const method = this._hasCapabilityOrThrow(clientCapability.fetchTickers)

    const data = await this.ccxtClient[method](symbols)

    return Object.values(data).map((data) => new Ticker({ data }))
  }
}

module.exports = { PublicClient }
