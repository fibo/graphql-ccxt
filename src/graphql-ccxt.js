const context = require('./context.js')
const schema = require('./graphql/schema.js')
const queries = require('./graphql/queries.js')

module.exports = {
  ...context,
  ...queries,
  ...schema
}
