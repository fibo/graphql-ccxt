const { Balance } = require('../types/Balance.js')
const { PublicClient } = require('./PublicClient.js')
const { clientCapability } = require('./clientCapabilities')

class PrivateClient extends PublicClient {
  async balance ({ currencies }) {
    const method = this._hasCapabilityOrThrow(clientCapability.fetchBalance)

    const data = await this.ccxtClient[method]()

    return new Balance({ data, filters: { currencies } })
  }
}

module.exports = { PrivateClient }
