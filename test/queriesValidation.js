const test = require('ava')
const { parse } = require('graphql')
const { validate } = require('graphql/validation')
const { makeSchema } = require('graphql-ccxt')

const { readExampleQueries } = require('../examples/queries/index.js')

// Keep in sync with queries documented in README.md
const defaultQuery = '{ clients { key } }'
const exampleQuery = `{
  client(key: "binance") {
    ticker(symbol: "BTC/USDT") {
      last
    }
  }
}`

async function validateQueries () {
  const schema = await makeSchema()

  const exampleQueries = await readExampleQueries()

  // Add queries documented in README.md to queries from folder examples/queries/
  const allQueries = [
    {
      queryKey: 'README defaultQuery',
      readQuery: Promise.resolve(defaultQuery)
    },
    {
      queryKey: 'README example query',
      readQuery: Promise.resolve(exampleQuery)
    }
  ].concat(
    exampleQueries.map(({ fileName, readFile }) => ({
      queryKey: fileName.replace(/\.graphql$/, ''),
      readQuery: readFile
    }))
  )

  for await (const { queryKey, readQuery } of allQueries) {
    test(`${queryKey} query validation`, async (t) => {
      const query = await readQuery

      const queryAst = parse(query)

      const errors = validate(schema, queryAst)
      const numErrors = errors.length

      if (numErrors === 0) {
        t.pass(queryKey)
      } else {
        t.fail(`
  Query ${queryKey} has ${numErrors} error${numErrors === 1 ? '' : 's'}:

  ${errors.map((error) => error.toString()).join('\n')}`)
      }
    })
  }
}

validateQueries()
