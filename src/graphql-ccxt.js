const context = require('./context.js')
const schema = require('./schema.js')
const queries = require('./queries.js')

module.exports = {
  ...context,
  ...queries,
  ...schema
}
