const { GraphqlCcxtContext } = require('../context.js')

async function closedOrders ({ list }, context) {
  const output = []

  for await (const input of list) {
    try {
      const client = await getClient(input.client, context)
      const orders = await client.closedOrders(input.symbol)
      output.push({ client, orders })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return output
}

function getClient ({ exchange, label }, context) {
  const clientKey = GraphqlCcxtContext.clientKey(exchange, label)
  return context.getClientInstanceByKey(clientKey)
}

function getClients (_, context) {
  return context.getClientsInstances()
}

async function openOrders ({ list }, context) {
  const output = []

  for await (const input of list) {
    try {
      const client = await getClient(input.client, context)
      const orders = await client.openOrders(input.symbol)
      output.push({ client, orders })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return output
}

async function tickerMulti ({ list }, context) {
  const output = []

  for await (const input of list) {
    try {
      const client = await getClient(input.client, context)
      const ticker = await client.ticker(input.symbol)
      output.push({ client, ticker })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return output
}

module.exports = {
  graphqlCcxtQueries: {
    client: getClient,
    clients: getClients,
    closedOrders,
    openOrders,
    tickerMulti
  }
}
