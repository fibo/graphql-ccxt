const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const {
  graphqlCcxtSchemaSource,
  graphqlCcxtQueries,
  GraphqlCcxtContext
} = require('graphql-ccxt')

async function startDemo () {
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
          defaultQuery: '{ clients { key } }'
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
