const schemaSource = `
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
  key: String!
  balance(currencies: [String]): Balance
  exchange: String!
  ticker(symbol: String!): Ticker
  tickers(symbols: [String]): [Ticker]
}

type Query {
  client(key: String!): Client

  clients: [Client]!
}
`

module.exports = {
  schemaSource
}
