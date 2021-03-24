const readFile = require('read-file-utf8')
const path = require('path')

function read (queryName) {
  const queryFilepath = path.join(__dirname, `${queryName}.graphql`)

  return readFile(queryFilepath)
}

const queries = {
  tickers01: read('tickers01')
}

module.exports = {
  queries
}
