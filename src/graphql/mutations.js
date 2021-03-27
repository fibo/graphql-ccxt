const {
  graphqlCcxtQueries: { client: getClient }
} = require('./queries.js')

function createOrder (input, context) {
  try {
    const client = getClient(input.client, context)
    return client.createOrder(input.order)
  } catch (error) {
    console.log(error)
    throw error
  }
}

async function createOrderMulti ({ list }, context) {
  const output = []

  for await (const input of list) {
    try {
      const client = getClient(input.client, context)
      const order = await client.createOrder(input.order)
      output.push({ client, order })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return output
}

module.exports = {
  graphqlCcxtMutations: {
    createOrder,
    createOrderMulti
  }
}
