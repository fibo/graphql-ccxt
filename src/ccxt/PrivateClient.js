const { Balance } = require('../models/Balance.js')
const { CcxtPublicClient } = require('./PublicClient.js')
const { ccxtClientCapability } = require('./ClientCapabilities')

class CcxtPrivateClient extends CcxtPublicClient {
  async balance ({ currencies }) {
    const method = this._hasCapabilityOrThrow(ccxtClientCapability.fetchBalance)

    const data = await this.ccxtClient[method]()

    return new Balance({ data, filters: { currencies } })
  }
}

module.exports = { CcxtPrivateClient }
