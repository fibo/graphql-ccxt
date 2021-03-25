const test = require('ava')
const { buildSchema, parse } = require('graphql')
const { validate } = require('graphql/validation')
const { schemaSource } = require('graphql-ccxt')

const { readExampleQueries } = require('../examples/queries/index.js')

// Keep in sync with defaultQuery documented in README.md
const defaultQuery = '{ clients { key } }'

async function validateQueries () {
  const schema = buildSchema(schemaSource)

  const exampleQueries = await readExampleQueries()

  // Add queries documented in README.md to queries from folder examples/queries/
  const allQueries = [
    {
      queryKey: 'README defaultQuery',
      readQuery: Promise.resolve(defaultQuery)
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
