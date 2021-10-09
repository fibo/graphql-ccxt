const { ccxtExchangeCapability } = require('./exchangeCapabilities.js')
const { CcxtPublicClient } = require('./PublicClient.js')

class CcxtPrivateClient extends CcxtPublicClient {
  static filterBalance ({ data: valueOf, filters: { currencies = [] } }) {
    return Object.keys(valueOf)
      .filter((currency) => valueOf[currency] > 0)
      .filter(
        (currency) => currencies.length === 0 || currencies.includes(currency)
      )
      .map((currency) => ({ currency, value: valueOf[currency] }))
  }

  async balance ({ currencies }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchBalance
    )

    const data = await this.ccxtExchange[method]()

    const { free, used, total } = data

    return {
      free: CcxtPrivateClient.filterBalance({
        data: free,
        filters: { currencies }
      }),
      used: CcxtPrivateClient.filterBalance({
        data: used,
        filters: { currencies }
      }),
      total: CcxtPrivateClient.filterBalance({
        data: total,
        filters: { currencies }
      })
    }
  }

  async closedOrders ({ filter: { symbol, daysAgo, limit, side } }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchClosedOrders
    )

    const since = this.millisecondsDaysAgo(daysAgo)

    const data = await this.ccxtExchange[method](symbol, since, limit)

    return data.filter((item) => {
      if (typeof side !== 'undefined') {
        return item.side === side
      } else {
        return true
      }
    })
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

    return data
  }

  async openOrders ({ filter: { symbol, daysAgo, limit } }) {
    const method = this._hasCapabilityOrThrow(
      ccxtExchangeCapability.fetchOpenOrders
    )

    const since = this.millisecondsDaysAgo(daysAgo)

    const data = await this.ccxtExchange[method](symbol, since, limit)

    return data
  }
}

module.exports = { CcxtPrivateClient }
