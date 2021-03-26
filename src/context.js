const ccxt = require('ccxt')

const { CcxtPublicClient } = require('./ccxt/PublicClient.js')
const { CcxtPrivateClient } = require('./ccxt/PrivateClient.js')

class GraphqlCcxtContext {
  constructor () {
    this.publicClientsMap = new Map()
    this.privateClientsMap = new Map()
  }

  static clientKey (exchange, label) {
    const noLabel = typeof label !== 'string'
    return noLabel ? exchange : `${exchange}:${label}`
  }

  async addClient ({
    // Client identifiers.
    exchange,
    label,
    // Private API params.
    apiKey,
    secret,
    uid,
    // Other params.
    enableRateLimit = true,
    timeout = 30000,
    ...otherCcxtExchangeParams
  }) {
    const { publicClientsMap, privateClientsMap } = this

    const clientKey = GraphqlCcxtContext.clientKey(exchange, label)

    // Do not create a public client instance twice.
    if (publicClientsMap.has(clientKey) || privateClientsMap.has(clientKey)) {
      return
    }

    const noApiKey = typeof apiKey === 'undefined'
    const noSecret = typeof secret === 'undefined'

    const isPublic = noApiKey || noSecret

    const CcxtExchange = ccxt[exchange]

    const ccxtExchange = new CcxtExchange({
      enableRateLimit,
      apiKey,
      secret,
      uid,
      timeout,
      ...otherCcxtExchangeParams
    })

    await ccxtExchange.loadMarkets()

    if (isPublic) {
      const client = new CcxtPublicClient({ ccxtExchange, label })

      publicClientsMap.set(clientKey, client)
    } else {
      const client = new CcxtPrivateClient({ ccxtExchange, label })

      privateClientsMap.set(clientKey, client)
    }
  }

  getClientInstanceByKey (clientKey) {
    const { publicClientsMap, privateClientsMap } = this

    if (publicClientsMap.has(clientKey)) {
      return publicClientsMap.get(clientKey)
    }

    if (privateClientsMap.has(clientKey)) {
      return privateClientsMap.get(clientKey)
    }
  }

  getClientsInstances () {
    const { publicClientsMap, privateClientsMap } = this

    const publicClientsInstances = Array.from(publicClientsMap.values())

    const privateClientsInstances = Array.from(privateClientsMap.values())

    return publicClientsInstances.concat(privateClientsInstances)
  }
}

module.exports = {
  GraphqlCcxtContext
}
