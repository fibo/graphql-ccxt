const fs = require('fs/promises')
const readFile = require('read-file-utf8')
const path = require('path')

/**
 * Read all .graphql files in this folder.
 */
async function readExampleQueries () {
  const filePaths = await fs.readdir(__dirname)

  return filePaths
    .filter((fileName) => fileName.endsWith('.graphql'))
    .map((fileName) => ({
      fileName,
      readFile: readFile(path.join(__dirname, fileName))
    }))
}

module.exports = {
  readExampleQueries
}
