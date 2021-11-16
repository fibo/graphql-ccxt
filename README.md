# graphql-ccxt

> wake up bears 🐻 ride bulls 🐂

You can read the [graphql-ccxt GraphQL schema source here](https://github.com/fibo/graphql-ccxt/blob/main/src/graphql/schema.graphql).

## Features

- Joins together [GraphQL] and [CCXT]: can fetch prices, read balance, open orders, etc.
- No dependencies other than [graphql](https://www.npmjs.com/package/graphql) and [ccxt](https://www.npmjs.com/package/ccxt) (by the way, installed as peer deps).
- Last but not least, it can be used to increase your income 💰💰💰

## Credits

Tons of kudos to creators of [GraphQL] and [CCXT]. Coders that designed and implemented both projects are so smart and passionate, they are a great example of the power of _open source_.

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

![query](https://github.com/fibo/graphql-ccxt/raw/main/media/query.png)

Take a look to [examples/](https://github.com/fibo/graphql-ccxt/tree/main/examples/) folder.
It contains both _queries_ and _mutations_, among others:

- [fetch Bitcoin price](https://github.com/fibo/graphql-ccxt/blob/main/examples/ticker_01.graphql)
- [fetch multiple prices, Bitcoin and Ethereum](https://github.com/fibo/graphql-ccxt/blob/main/examples/tickers_01.graphql)
- [fetch your balance](https://github.com/fibo/graphql-ccxt/blob/main/examples/balance_01.graphql)
- [fetch your balance, only Bitcoin and Ethereum](https://github.com/fibo/graphql-ccxt/blob/main/examples/balance_02.graphql)
- [create an order](https://github.com/fibo/graphql-ccxt/blob/main/examples/createOrder_01.graphql)
- [fetch available timeframes](https://github.com/fibo/graphql-ccxt/blob/main/examples/timeframes_01.graphql)
- [fetch OHLCV candlesticks](https://github.com/fibo/graphql-ccxt/blob/main/examples/candles_01.graphql)

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
  // 1. Create GraphQL context. It holds your exchange clients.
  // //////////////////////////////////////////////////////////////////////////
  const context = new GraphqlCcxtContext()

  // Add few public clients on some exchanges.
  await context.addClient({ exchange: 'binance' })
  await context.addClient({ exchange: 'coinbase' })
  await context.addClient({ exchange: 'bitfinex' })
  await context.addClient({ exchange: 'bittrex' })
  await context.addClient({ exchange: 'kraken' })
  // Add another Binance client, provide a `label` to disambiguate it.
  // It will be private if environment variables are defined,
  // otherwise it will be public.
  await context.addClient({
    exchange: 'binance',
    label: 'My Binance',
    apiKey: process.env.BINANCE_APIKEY,
    secret: process.env.BINANCE_APISECRET
  })

  // 2. Build GraphQL schema.
  // //////////////////////////////////////////////////////////////////////////
  const schema = buildSchema(graphqlCcxtSchemaSource)

  // 3. Launch express-graphql server.
  // //////////////////////////////////////////////////////////////////////////
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
    .listen(4000, () => {
      console.info(
        'Running a graphql-ccxt server at http://localhost:4000/graphql'
      )
    })
}

startDemo()
```

## License

[MIT](http://g14n.info/mit-license)

[graphql]: https://graphql.org
[ccxt]: http://ccxt.trade
