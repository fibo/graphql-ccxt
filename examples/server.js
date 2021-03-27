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
  /// /
  const context = new GraphqlCcxtContext()
  // Add a public client on Coinbase exchange.
  await context.addClient({
    exchange: 'coinbase'
  })
  // Add another client on Binance exchange.
  // It will be private if environment variables are defined, otherwise it will be public.
  await context.addClient({
    exchange: 'binance',
    apiKey: process.env.BINANCE_APIKEY,
    secret: process.env.BINANCE_APISECRET
  })

  // 2. Build GraphQL schema.
  /// /
  const schemaSource = await graphqlCcxtSchemaSource()
  const schema = buildSchema(schemaSource)

  // 3. Launch express-graphql server.
  /// /
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
      console.log(
        'Running a graphql-ccxt server at http://localhost:4000/graphql'
      )
    })
}

startDemo()
