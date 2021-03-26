const { GraphqlCcxtContext } = require('../context.js')

function createOrder (
  { client: { exchange, label }, order: { side, type, symbol, amount } },
  context
) {
  const clientKey = GraphqlCcxtContext.clientKey(exchange, label)
  const client = context.getClientInstanceByKey(clientKey)

  try {
    return client.createOrder({ side, type, symbol, amount })
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function createOrders ({ list }, context) {
  const result = []

  for (const { client, orders } of list) {
    const ordersResult = []

    for await (const order of orders) {
      try {
        const orderResult = await this.createOrder({ client, order })

        ordersResult.push(orderResult)
      } catch (error) {
        console.log(error)
        throw error
      }
    }

    result.push({ client, orders: ordersResult })
  }

  return result
}

module.exports = {
  graphqlCcxtMutations: {
    createOrder,
    createOrders
  }
}
