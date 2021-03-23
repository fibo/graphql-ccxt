# graphql-ccxt

> wake up bears 🐻 ride bulls 🐂

## Quick start

0. Get this repository.
1. Install deps: `npm install`
2. Launch the demo: `npm start`

## Demo

```javascript
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { makeSchema, queries, GraphqlCcxtContext } = require('graphql-ccxt')

async function startDemo() {
  const context = new GraphqlCcxtContext()
  context.addClient({ exchange: 'binance' })

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
```

## License

[MIT](http://g14n.info/mit-license)
