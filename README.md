# graphql-ccxt

> wake up bears 🐻 ride bulls 🐂

## Credits

Tons of kudos to creators of [GraphQL](https://graphql.org/) and [CCXT](http://ccxt.trade). Coders that designed and implemented both projects are so smart and passionate, they are a great example of the power of _open source_.

## Installation

Install this package and add the following _peer dependencies_:

- graphql
- ccxt

For instance with [npm](https://www.npmjs.com/) launch

```bash
npm install graphql ccxt graphql-ccxt
```

## Demo

0. Get [this repository](https://github.com/fibo/graphql-ccxt) code.
1. Install deps: `npm install`
2. Launch the demo: `npm start`

Then point your browser to http://localhost:4000/graphql

![query](media/query.png)

Take a look to [examples/graphql/](https://github.com/fibo/graphql-ccxt/tree/main/examples/graphql) folder.
It contains both queries and mutations, among others:

- [fetch Bitcoin price](https://github.com/fibo/graphql-ccxt/blob/main/examples/graphql/ticker_01.graphql)
- [fetch multiple prices, Bitcoin and Ethereum](https://github.com/fibo/graphql-ccxt/blob/main/examples/graphql/tickers_01.graphql)
- [fetch your balance](https://github.com/fibo/graphql-ccxt/blob/main/examples/graphql/balance_01.graphql)
- [fetch your balance, only Bitcoin and Ethereum](https://github.com/fibo/graphql-ccxt/blob/main/examples/graphql/balance_02.graphql)
- [create an order](https://github.com/fibo/graphql-ccxt/blob/main/examples/graphql/createOrder_01.graphql)
- [create multiple orders on multiple exchanges](https://github.com/fibo/graphql-ccxt/blob/main/examples/graphql/createOrders_01.graphql)

### Access private API

**Optionally**, before launching the _demo server_, set the following environment variables accordingly:

- `BINANCE_APIKEY`
- `BINANCE_APISECRET`

### Demo source code

The demo server is implemented by the following code.

```javascript
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const {
  GraphqlCcxtContext,
  graphqlCcxtRoot,
  graphqlCcxtSchemaSource
} = require('graphql-ccxt')

async function startDemo() {
  const context = new GraphqlCcxtContext()
  await context.addClient({
    exchange: 'binance',
    apiKey: process.env.BINANCE_APIKEY,
    secret: process.env.BINANCE_APISECRET
  })

  const schema = buildSchema(graphqlCcxtSchemaSource)

  const port = 4000

  express()
    .use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue: graphqlCcxtRoot,
        context,
        graphiql: {
          defaultQuery: '{ clients { exchange } }'
        }
      })
    )
    .listen(port, () => {
      console.log(
        `Running a graphql-ccxt server at http://localhost:${port}/graphql`
      )
    })
}

startDemo()
```

## Schema

This is the _graphql-ccxt_ schema.

```graphql
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
  CANCELED
  CLOSED
  EXPIRED
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
```

## License

[MIT](http://g14n.info/mit-license)
