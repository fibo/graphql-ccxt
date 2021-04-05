class Order {
  constructor ({
    data: {
      amount,
      cost,
      datetime,
      filled,
      lastTradeTimestamp,
      price,
      remaining,
      side,
      status,
      symbol,
      timestamp,
      type
    }
  }) {
    Object.defineProperties(this, {
      amount: { value: amount },
      cost: { value: cost },
      datetime: { value: datetime },
      filled: { value: filled },
      lastTradeTimestamp: { value: lastTradeTimestamp },
      price: { value: price },
      remaining: { value: remaining },
      side: { value: side.toUpperCase() },
      status: { value: status.toUpperCase() },
      symbol: { value: symbol },
      timestamp: { value: timestamp },
      type: { value: type.toUpperCase() }
    })
  }
}

module.exports = {
  Order
}
