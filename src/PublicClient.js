class PublicClient {
  constructor({ ccxtClient, key }) {
    this.ccxtClient = ccxtClient
    this.key = key
    this.exchange = ccxtClient.id
  }

  ticker({ symbol }) {
    return this.ccxtClient.fetchTicker(symbol)
  }
}

module.exports = { PublicClient }
