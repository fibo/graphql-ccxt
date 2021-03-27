const {
  graphqlCcxtSchemaSource,
  GraphqlCcxtContext,
  graphqlCcxtRoot
} = require('graphql-ccxt')
const { buildSchema, execute, parse, Source } = require('graphql')

async function graphqlCcxtBrowserExample () {
  const context = new GraphqlCcxtContext()
  await context.addClient({ exchange: 'binance' })

  const schema = buildSchema(graphqlCcxtSchemaSource)
  const operationName = null
  const variables = null
  const query = `
    {
      client(exchange: "binance") {
        ticker(symbol: "BTC/BUSD") {
          symbol
          last
        }
      }
    }
  `

  const documentAST = parse(new Source(query))

  const result = await execute({
    schema,
    document: documentAST,
    rootValue: graphqlCcxtRoot,
    contextValue: context,
    operationName,
    variableValues: variables
  })

  document.body.innerHTML = `<pre><code>${JSON.stringify(
    result,
    null,
    2
  )}</code></pre>`
}

graphqlCcxtBrowserExample()
