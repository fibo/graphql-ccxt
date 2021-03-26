const graphqlCcxtSchemaSource = `
# Data definition
#######################################################################

type Amount {
  currency: String!
  value: Float!
}

type Balance {
  free: [Amount]
  total: [Amount]
  used: [Amount]
}

type Ticker {
  symbol: String!
  last: Float
}

enum OrderType {
  LIMIT
  MARKET
}

enum OrderSide {
  BUY
  SELL
}

enum OrderStatus {
  CANCELED,
  CLOSED,
  EXPIRED,
  OPEN
}

type Order {
  # Params of "createOrder" method.

  """
  Currency pair symbol, e.g. BTC/ETH.
  """
  symbol: String
  """
  Can be MARKET, LIMIT.
  """
  type: OrderType
  """
  Can be BUY, SELL.
  """
  side: OrderSide
  """
  ordered amount of base currency
  """
  amount: Float
  """
  float price in quote currency (may be empty for market orders)
  """
  price: Float

  # Data from exchange, once order is created.

  """
  'filled' * 'price' (filling price used where available)
  """
  cost: Float
  """
  ISO8601 datetime of 'timestamp' with milliseconds
  """
  datetime: String
  """
  Filled amount of base currency.
  """
  filled: Float
  """
  Unix timestamp of the most recent trade on this order.
  """
  lastTradeTimestamp: Int
  """
  remaining amount to fill
  """
  remaining: Float
  """
  Can be OPEN, CLOSED, CANCELED, EXPIRED.
  """
  status: OrderStatus
  """
  Order placing/opening Unix timestamp in milliseconds.
  """
  timestamp: Int
}

type Client {
  """
  A client is identified at first by the exchange id, e.g. "binance".
  """
  exchange: String!
  """
  A label is optionally used to distinguish two clients on the same exchange.
  """
  label: String

  # Public API

  ticker(symbol: String!): Ticker
  tickers(symbols: [String]): [Ticker]

  # Private API

  balance(currencies: [String]): Balance
}

type Query {
  client(exchange: String!, label: String): Client

  clients: [Client]!
}

# Data manipulation
#######################################################################

input OrderInput {
  symbol: String!
  type: OrderType!
  side: OrderSide!
  amount: Float!
  price: Float
}

input ClientInput {
  exchange: String!
  label: String
}

input OrdersInput {
  client: ClientInput!
  orders: [OrderInput!]!
}

type OrdersOutput {
  client: Client
  orders: [Order]
}

type Mutation {
  createOrder(client: ClientInput!, order: OrderInput!): Order
  # Can create multiple orders on multiple exchanges. 🤩
  createOrders(list: [OrdersInput]): [OrdersOutput]
}

`
module.exports = { graphqlCcxtSchemaSource }
