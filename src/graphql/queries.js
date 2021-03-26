const { GraphqlCcxtContext } = require('../context.js')

const graphqlCcxtQueries = {
  client: ({ exchange, label }, context) => {
    const clientKey = GraphqlCcxtContext.clientKey(exchange, label)
    return context.getClientInstanceByKey(clientKey)
  },
  clients: (_, context) => {
    return context.getClientsInstances()
  }
}

module.exports = {
  graphqlCcxtQueries
}
