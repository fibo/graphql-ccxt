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
    this.amount = amount
    this.cost = cost
    this.datetime = datetime
    this.filled = filled
    this.lastTradeTimestamp = lastTradeTimestamp
    this.price = price
    this.remaining = remaining
    this.side = side.toUpperCase()
    this.status = status.toUpperCase()
    this.symbol = symbol
    this.timestamp = timestamp
    this.type = type.toUpperCase()
  }
}

module.exports = {
  Order
}
