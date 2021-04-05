const { Balance } = require('../models/Balance.js')
const { Order } = require('../models/Order.js')
const { ccxtExchangeCapability } = require('./exchangeCapabilities')
const { CcxtPublicClient } = require('./PublicClient.js')

class CcxtPrivateClient extends CcxtPublicClient {
  async balance ({ currencies }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchBalance
    )

    const data = await this.ccxtExchange[method]()

    return new Balance({ data, filters: { currencies } })
  }

  async closedOrders ({ filter: { symbol, daysAgo, limit } }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchClosedOrders
    )

    const since = CcxtPublicClient.millisecondsDaysAgo(daysAgo)

    const data = await this.ccxtExchange[method](symbol, since, limit)

    return data.map((item) => new Order({ data: item }))
  }

  async createOrder ({ side, type, symbol, amount, price }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.createOrder
    )

    const noPrice = typeof price === 'undefined'

    if (noPrice) {
      const { last } = await this.ticker({ symbol })

      price = last
    }

    const data = await this.ccxtExchange[method](
      symbol,
      type,
      side,
      amount,
      price
    )

    return new Order({ data })
  }

  async openOrders ({ filter: { symbol, daysAgo, limit } }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchOpenOrders
    )

    const since = CcxtPublicClient.millisecondsDaysAgo(daysAgo)

    const data = await this.ccxtExchange[method](symbol, since, limit)

    return data.map((item) => new Order({ data: item }))
  }
}

module.exports = { CcxtPrivateClient }
