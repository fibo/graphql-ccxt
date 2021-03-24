const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { makeSchema, queries, GraphqlCcxtContext } = require('graphql-ccxt')

async function startDemo() {
  const context = new GraphqlCcxtContext()
  await context.addClient({ exchange: 'binance' })

  const rootValue = {
    ...queries
  }

  const schema = await makeSchema()

  const port = 4000

  express()
    .use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue,
        context,
        graphiql: {
          defaultQuery: '{ clients }'
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
