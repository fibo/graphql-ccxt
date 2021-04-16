const { GraphqlCcxtContext } = require('../context.js')
const { CandlesError } = require('../models/Candle.js')

async function closedOrdersMulti ({ list }, context) {
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

async function marketsMulti ({ list }, context) {
  const output = []

  for await (const input of list) {
    try {
      const client = await getClient(input.client, context)
      const markets = await client.markets({ filter: input.filter })
      output.push({ client, markets })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return output
}

async function openOrdersMulti ({ list }, context) {
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
      const ticker = await client.ticker({ symbol: input.symbol })
      output.push({ client, ticker })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return output
}

async function tickersMulti ({ list }, context) {
  const output = []

  for await (const input of list) {
    try {
      const client = await getClient(input.client, context)
      const tickers = await client.tickers({ symbols: input.symbols })
      output.push({ client, tickers })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return output
}

async function timeframesMulti ({ list }, context) {
  const output = []

  for await (const input of list) {
    try {
      const client = await getClient(input.client, context)
      const timeframes = client.timeframes()
      output.push({ client, timeframes })
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return output
}

async function candlesMulti ({ list }, context) {
  const output = []

  const fetchCandles = async function (client, filter) {
    let results
    try {
      results = await client.candles({ filter })
    } catch (e) {
      results = new CandlesError(e)
      output.push({ client, results })
    }

    output.push({ client, results })
  }

  for (const input of list) {
    const client = await getClient(input.client, context)
    const fetchCalls = input.filters.map((filter) =>
      fetchCandles(client, filter)
    )
    await Promise.all(fetchCalls).catch((e) => {
      console.error(e)
      return Promise.resolve()
    })
  }

  return output
}

module.exports = {
  graphqlCcxtQueries: {
    client: getClient,
    clients: getClients,
    closedOrdersMulti,
    openOrdersMulti,
    marketsMulti,
    tickerMulti,
    tickersMulti,
    candlesMulti,
    timeframesMulti
  }
}
