const test = require('ava')

const { dependencies } = require('../package.json')

test('no dependencies', (t) => {
  t.is(Object.keys(dependencies).length, 0)
})
