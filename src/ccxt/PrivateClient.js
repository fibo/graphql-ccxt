const { Balance } = require('../models/Balance.js')
const { Order } = require('../models/Order.js')
const { CcxtPublicClient } = require('./PublicClient.js')
const { ccxtExchangeCapability } = require('./exchangeCapabilities')

class CcxtPrivateClient extends CcxtPublicClient {
  async balance ({ currencies }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchBalance
    )

    const data = await this.ccxtExchange[method]()

    return new Balance({ data, filters: { currencies } })
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
}

module.exports = { CcxtPrivateClient }
