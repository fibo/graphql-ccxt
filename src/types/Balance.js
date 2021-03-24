const { Amount } = require('./Amount.js')

const objectToAmountList = ({ data: valueOf, filters: { currencies = [] } }) =>
  Object.keys(valueOf)
    .filter((currency) => valueOf[currency] > 0)
    .filter(
      (currency) => currencies.length === 0 || currencies.includes(currency)
    )
    .map(
      (currency) => new Amount({ data: { currency, value: valueOf[currency] } })
    )

class Balance {
  constructor ({ data: { free, used, total }, filters: { currencies = [] } }) {
    this.free = objectToAmountList({ data: free, filters: { currencies } })
    this.used = objectToAmountList({ data: used, filters: { currencies } })
    this.total = objectToAmountList({ data: total, filters: { currencies } })
  }
}

module.exports = {
  Balance
}
