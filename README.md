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

Then point your browser to http://localhost:4000/graphql and try some query, take a look to [examples/queries/](https://github.com/fibo/graphql-ccxt/tree/main/examples/queries) folder.

![query](media/query.png)

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
  graphqlCcxtSchemaSource,
  graphqlCcxtQueries,
  GraphqlCcxtContext
} = require('graphql-ccxt')

async function startDemo() {
  const context = new GraphqlCcxtContext()
  await context.addClient({
    exchange: 'binance',
    apiKey: process.env.BINANCE_APIKEY,
    secret: process.env.BINANCE_APISECRET
  })

  const rootValue = {
    ...graphqlCcxtQueries
  }

  const schema = buildSchema(graphqlCcxtSchemaSource)

  const port = 4000

  express()
    .use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue,
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
```

## License

[MIT](http://g14n.info/mit-license)
