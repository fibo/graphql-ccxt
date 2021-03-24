const ccxt = require('ccxt')

class GraphqlCcxtContext {
  constructor() {
    this.publicClients = new Map()
    this.privateClients = new Map()
  }

  async addClient({ exchange, timeout = 3000, apiKey, secret, uid }) {
    const { publicClients } = this

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
    }
  }
}

module.exports = {
  GraphqlCcxtContext
}
