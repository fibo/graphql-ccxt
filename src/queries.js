const clientInstanceToData = (clientsMap) => (key) => {
  const client = clientsMap.get(key)
  const exchange = client.id

  return {
    key,
    exchange
  }
}

const queries = {
  clients: (_, { publicClients, privateClients }) =>
    Array.from(publicClients.keys())
      .map(clientInstanceToData(publicClients))
      .concat(
        Array.from(privateClients.keys()).map(
          clientInstanceToData(privateClients)
        )
      )
}

module.exports = {
  queries
}
