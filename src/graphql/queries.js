const { GraphqlCcxtContext } = require('../context.js')

function getClient ({ exchange, label }, context) {
  const clientKey = GraphqlCcxtContext.clientKey(exchange, label)
  return context.getClientInstanceByKey(clientKey)
}

function getClients (_, context) {
  return context.getClientsInstances()
}

module.exports = {
  graphqlCcxtQueries: {
    client: getClient,
    clients: getClients
  }
}
