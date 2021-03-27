const test = require('ava')
const { buildSchema, parse } = require('graphql')
const { validate } = require('graphql/validation')
const { graphqlCcxtSchemaSource } = require('graphql-ccxt')

const { readGraphqlExamples } = require('../examples/graphql/index.js')

// Keep in sync with defaultQuery documented in README.md
const defaultQuery = '{ clients { exchange } }'

function graphqlValidationFailed (queryKey, errors) {
  const numErrors = errors.length

  return `
Query examples/graphql/${queryKey}.graphql has ${numErrors} error${
    numErrors === 1 ? '' : 's'
  }:

${errors.map((error) => error.toString()).join('\n')}
`
}

async function validateGraphqlExamples () {
  const schema = buildSchema(graphqlCcxtSchemaSource)

  const graphqlExamples = await readGraphqlExamples()

  // Add queries documented in README.md to queries from folder examples/queries/
  const allQueries = [
    {
      queryKey: 'README defaultQuery',
      readQuery: Promise.resolve(defaultQuery)
    }
  ].concat(
    graphqlExamples.map(({ fileName, readFile }) => ({
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
        t.fail(graphqlValidationFailed(queryKey, errors))
      }
    })
  }
}

validateGraphqlExamples()
