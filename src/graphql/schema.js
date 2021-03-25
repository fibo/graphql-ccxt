const graphqlCcxtSchemaSource = `
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

type Client {
  """
  A client is identified at first by the exchange id, e.g. "binance".
  """
  exchange: String!
  """
  The label is optionally used to distinguish two clients on the same exchange.
  """
  label: String

  balance(currencies: [String]): Balance
  ticker(symbol: String!): Ticker
  tickers(symbols: [String]): [Ticker]
}

type Query {
  client(exchange: String!, label: String): Client

  clients: [Client]!
}

`
module.exports = { graphqlCcxtSchemaSource }
