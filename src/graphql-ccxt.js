const context = require('./context.js')
const schema = require('./graphql/schema.js')
const queries = require('./graphql/queries.js')
const mutations = require('./graphql/mutations.js')

module.exports = {
  ...context,
  ...schema,
  ...queries,
  ...mutations,
  graphqlCcxtRoot: {
    ...queries.graphqlCcxtQueries,
    ...mutations.graphqlCcxtMutations
  }
}
