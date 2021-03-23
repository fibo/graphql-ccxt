const { buildSchema } = require('graphql')
const path = require('path')
const read = require('read-file-utf8')

async function makeSchema() {
  const schemaFilepath = path.join(__dirname, 'schema.graphql')

  const schemaSource = await read(schemaFilepath)

  return buildSchema(schemaSource)
}

module.exports = {
  makeSchema
}
