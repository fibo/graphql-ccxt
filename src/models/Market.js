const { NumericInterval } = require('./NumericInterval.js')

const { isNumericInterval } = NumericInterval

class MarketLimits {
  constructor ({ data: { amount, price, cost, market } }) {
    if (isNumericInterval(amount)) {
      this.amount = new NumericInterval({ data: amount })
    }

    if (isNumericInterval(price)) {
      this.price = new NumericInterval({ data: price })
    }

    if (isNumericInterval(cost)) {
      this.cost = new NumericInterval({ data: cost })
    }

    if (isNumericInterval(market)) {
      this.market = new NumericInterval({ data: market })
    }
  }
}

class MarketPrecision {
  constructor ({ data: { base, quote, amount, price } }) {
    this.base = base
    this.quote = quote
    this.amount = amount
    this.price = price
  }
}

class Market {
  constructor ({ data: { active, symbol, base, quote, precision, limits } }) {
    this.symbol = symbol
    this.base = base
    this.quote = quote
    this.active = active

    const hasLimits = typeof limits === 'object'
    if (hasLimits) {
      this.limits = new MarketLimits({ data: limits })
    }

    const hasPrecision = typeof precision === 'object'
    if (hasPrecision) {
      this.precistion = new MarketPrecision({ data: precision })
    }
  }
}

module.exports = {
  Market,
  MarketLimits,
  MarketPrecision
}
