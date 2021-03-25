const readFile = require('read-file-utf8')
const path = require('path')
const writeFile = require('write-file-utf8')

async function generateSchemaJsModule () {
  const graphqlDir = path.join(__dirname, '..', 'graphql')
  const inputFilepath = path.join(graphqlDir, 'schema.graphql')
  const outputFilepath = path.join(graphqlDir, 'schema.js')

  const schemaSource = await readFile(inputFilepath)

  const content = [
    'const graphqlCcxtSchemaSource = `',
    schemaSource,
    '`',
    'module.exports = { graphqlCcxtSchemaSource }'
  ].join('\n')

  await writeFile(outputFilepath, content)
}

generateSchemaJsModule()
