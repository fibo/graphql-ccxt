// DO NOT EDIT THIS FILE
//
// it is generated by command
//
//     npm run generate:src/graphql/schema.js
//
module.exports = {
  graphqlCcxtSchemaSource: `
# graphql-ccxt

# Enumerations
#######################################################################

enum OrderType {
  LIMIT
  MARKET
}

enum OrderSide {
  BUY
  SELL
}

enum OrderStatus {
  CANCELED
  CLOSED
  EXPIRED
  OPEN
}

# Input types
#######################################################################

input ClientKeyInput {
  exchange: String!
  label: String
}

input MarketsFilterInput {
  active: Boolean
  base: String
  quote: String
}

input OrdersFilterInput {
  symbol: String
  daysAgo: Int
  limit: Int
}

input OrderInput {
  symbol: String!
  type: OrderType!
  side: OrderSide!
  amount: Float!
  price: Float
}

# Type definitions
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
  #####################################################################

  candles(
    symbol: String!
    """
    Timestamp in milliseconds.
    """
    start: String!
    """
    Time resolution e.g. "1m", "5m", "1h", "1d", etc. Default: "1h".
    """
    timeframe: String = "1h"
    """
    Number of candles. Default: 10.
    """
    limit: Int = 10
  ): Candles
  markets(filter: MarketsFilterInput): [Market]
  ticker(symbol: String!): Ticker
  tickers(symbols: [String]): [Ticker]
  timeframes: [String!]

  # Private API
  #####################################################################

  balance(currencies: [String]): Balance
  closedOrders(filter: OrdersFilterInput!): [Order]
  openOrders(filter: OrdersFilterInput!): [Order]
}

type ClientKey {
  exchange: String!
  label: String
}

type NumericInterval {
  min: Float
  max: Float
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

type Market {
  symbol: String!
  base: String!
  quote: String!
  active: Boolean
  limits: MarketLimits
  precision: MarketPrecision
}

type MarketLimits {
  amount: NumericInterval
  price: NumericInterval
  cost: NumericInterval
  market: NumericInterval
}

type MarketPrecision {
  base: Int
  quote: Int
  amount: Int
  price: Int
}

type Ticker {
  symbol: String!
  last: Float
  open: Float
  high: Float
  close: Float
  low: Float
  bid: Float
  ask: Float
  vwap: Float
  percentage: Float
  change: Float
}

type CandleDataPoint {
  timestamp: String!
  ohlcv: [Float!]
  open: Float!
  high: Float!
  low: Float!
  close: Float!
  volume: Float!
}

type Candles {
  symbol: String
  start: String
  series: [CandleDataPoint!]
}

# Special types: Query and Mutation
#######################################################################

type Query {
  client(exchange: String!, label: String): Client
  clients: [Client]!
}

type Mutation {
  # All mutations are private API
  createOrder(client: ClientKeyInput!, order: OrderInput!): Order
}
`
}
