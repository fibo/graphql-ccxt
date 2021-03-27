const { readFile } = require('fs/promises')
const path = require('path')

const graphqlCcxtSchemaFilepath = path.join(__dirname, 'schema.graphql')

function graphqlCcxtSchemaSource () {
  return readFile(graphqlCcxtSchemaFilepath, { encoding: 'utf8' })
}

module.exports = { graphqlCcxtSchemaSource }
