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

module.exports = {
  graphqlCcxtMutations: {
    createOrder
  }
}
