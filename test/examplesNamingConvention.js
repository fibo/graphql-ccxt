const test = require('ava')

const { readGraphqlExamples } = require('../examples/index.js')

/*
 * Naming convention for graphql examples is
 *
 *     {keyword}_{num}.grapqhl
 *
 * where:
 *   - keyword must be contained in file content
 */

async function examplesNamingConvention () {
  const fileNameExample = 'balance_01.graphql'

  const graphqlExamples = await readGraphqlExamples()

  for await (const { fileName, readFile } of graphqlExamples) {
    test(`${fileName} naming convention`, async (t) => {
      const fileNameParts = fileName.replace(/\.graphql$/, '').split('_')

      if (fileNameParts.length === 2) {
        t.pass(`File name ${fileName} contains only one underscore`)
      } else {
        t.fail(
          `Example file name '${fileName}' must contain only one underscore, for example '${fileNameExample}'`
        )
      }

      const [keyword, num] = fileNameParts

      if (/^\d\d$/.test(num)) {
        t.pass(`File name ${fileName} ends with number`)
      } else {
        t.fail(
          `Example file name '${fileName}' must end with _NN.grapqhl where NN is a number, for example '${fileNameExample}'`
        )
      }

      const content = await readFile

      if (content.includes(keyword)) {
        t.pass(`keyword ${keyword}`)
      } else {
        t.fail(`${fileName} must contain keyword '${keyword}'`)
      }
    })
  }
}

examplesNamingConvention()
