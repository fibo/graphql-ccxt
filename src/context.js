const ccxt = require('ccxt')

class GraphqlCcxtContext {
  constructor () {
    this.publicClients = new Map()
    this.privateClients = new Map()
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
    timeout = 3000
  }) {
    const { publicClients, privateClients } = this

    const clientKey = GraphqlCcxtContext.clientKey(exchange, label)

    const noApiKey = typeof apiKey === 'undefined'
    const noSecret = typeof secret === 'undefined'

    const isPublic = noApiKey || noSecret

    const ClientClass = ccxt[exchange]

    if (isPublic) {
      // Do not create a public client instance twice.
      if (publicClients.has(exchange)) return

      const client = new ClientClass({
        enableRateLimit: true,
        timeout
      })

      await client.loadMarkets()

      publicClients.set(clientKey, client)
    } else {
      const client = new ClientClass({
        enableRateLimit: true,
        timeout,
        apiKey,
        secret,
        uid
      })

      await client.loadMarkets()

      privateClients.set(clientKey, client)
    }
  }
}

module.exports = {
  GraphqlCcxtContext
}
