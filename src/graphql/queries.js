const { CcxtPublicClient } = require('../ccxt/PublicClient.js')
const { CcxtPrivateClient } = require('../ccxt/PrivateClient.js')
const { GraphqlCcxtContext } = require('../context.js')

const clientInstance = (clientsMap, ClientClass) => (key) => {
  const ccxtClient = clientsMap.get(key)

  return new ClientClass({
    ccxtClient,
    key
  })
}

const graphqlCcxtQueries = {
  client: ({ exchange, label }, { publicClients, privateClients }) => {
    const clientKey = GraphqlCcxtContext.clientKey(exchange, label)

    if (publicClients.has(clientKey)) {
      return clientInstance(publicClients, CcxtPublicClient)(clientKey)
    }

    if (privateClients.has(clientKey)) {
      return clientInstance(privateClients, CcxtPrivateClient)(clientKey)
    }
  },
  clients: (_, { publicClients, privateClients }) => {
    const publicClientsInstances = Array.from(publicClients.keys()).map(
      clientInstance(publicClients, CcxtPublicClient)
    )

    const privateClientsInstances = Array.from(privateClients.keys()).map(
      clientInstance(privateClients, CcxtPrivateClient)
    )

    return publicClientsInstances.concat(privateClientsInstances)
  }
}

module.exports = {
  graphqlCcxtQueries
}
