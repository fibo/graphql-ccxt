const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const {
  GraphqlCcxtContext,
  graphqlCcxtRoot,
  graphqlCcxtSchemaSource
} = require('graphql-ccxt')

async function startDemo () {
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
