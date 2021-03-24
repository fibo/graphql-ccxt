const { PublicClient } = require('./PublicClient.js')
const { PrivateClient } = require('./PrivateClient.js')

const clientInstance = (clientsMap, ClientClass) => (key) => {
  const ccxtClient = clientsMap.get(key)

  return new ClientClass({
    ccxtClient,
    key
  })
}

const queries = {
  client: ({ key }, { publicClients, privateClients }) => {
    if (publicClients.has(key)) {
      return clientInstance(publicClients, PublicClient)(key)
    }

    if (privateClients.has(key)) {
      return clientInstance(privateClients, PrivateClient)(key)
    }
  },
  clients: (_, { publicClients, privateClients }) => {
    const publicClientsInstances = Array.from(publicClients.keys()).map(
      clientInstance(publicClients, PublicClient)
    )

    const privateClientsInstances = Array.from(privateClients.keys()).map(
      clientInstance(privateClients, PrivateClient)
    )

    return publicClientsInstances.concat(privateClientsInstances)
  }
}

module.exports = {
  queries
}
