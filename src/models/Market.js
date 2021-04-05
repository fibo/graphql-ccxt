const { NumericInterval } = require('./NumericInterval.js')

class MarketLimits {
  constructor ({ data: { amount, price, cost, market } }) {
    const hasAmount = typeof amount === 'object'
    if (hasAmount) {
      Object.defineProperty(this, 'amount', {
        value: new NumericInterval({ data: amount })
      })
    }

    const hasPrice = typeof price === 'object'
    if (hasPrice) {
      Object.defineProperty(this, 'price', {
        value: new NumericInterval({ data: amount })
      })
    }

    const hasCost = typeof cost === 'object'
    if (hasCost) {
      Object.defineProperty(this, 'cost', {
        value: new NumericInterval({ data: amount })
      })
    }

    const hasMarket = typeof market === 'object'
    if (hasMarket) {
      Object.defineProperty(this, 'market', {
        value: new NumericInterval({ data: amount })
      })
    }
  }
}

class MarketPrecision {
  constructor ({ data: { base, quote, amount, price } }) {
    Object.defineProperties(this, {
      base: { value: base },
      quote: { value: quote },
      amount: { value: amount },
      price: { value: price }
    })
  }
}

class Market {
  constructor ({ data: { active, symbol, base, quote, precision, limits } }) {
    Object.defineProperties(this, {
      symbol: { value: symbol },
      base: { value: base },
      quote: { value: quote }
    })

    Object.defineProperty(this, 'active', { value: active })

    const hasLimits = typeof limits === 'object'
    if (hasLimits) {
      Object.defineProperty(this, 'limits', {
        value: new MarketLimits({ data: limits })
      })
    }

    Object.defineProperty(this, 'precision', {
      value: new MarketPrecision({ data: precision })
    })
  }
}

module.exports = {
  Market,
  MarketLimits,
  MarketPrecision
}
