const ccxt = require('ccxt')

class GraphqlCcxtContext {
  constructor () {
    this.publicClients = new Map()
    this.privateClients = new Map()
  }

  async addClient ({ exchange, timeout = 3000, apiKey, secret, uid }) {
    const { publicClients, privateClients } = this

    const noApiKey = typeof apiKey === 'undefined'
    const noSecret = typeof secret === 'undefined'

    const isPublic = noApiKey && noSecret

    const ClientClass = ccxt[exchange]

    if (isPublic) {
      // Do not create a public client instance twice.
      if (publicClients.has(exchange)) return

      const client = new ClientClass({
        enableRateLimit: true,
        timeout
      })

      await client.loadMarkets()

      publicClients.set(exchange, client)
    } else {
      const client = new ClientClass({
        enableRateLimit: true,
        timeout,
        apiKey,
        secret,
        uid
      })

      await client.loadMarkets()

      privateClients.set(exchange, client)
    }
  }
}

module.exports = {
  GraphqlCcxtContext
}
