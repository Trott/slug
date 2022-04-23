/* global beforeEach, chai, describe, it */

import slug from '../slug.js'

let assert
if (typeof chai === 'undefined') {
  assert = (await import('node:assert')).default
} else {
  assert = chai.assert
}

describe('slug', function () {
  beforeEach(slug.reset)

  it('should replace romanian chars', function () {
    const charMap = {
      ț: 't',
      Ț: 'T',
      ţ: 't',
      Ţ: 'T',
      ș: 's',
      Ș: 'S',
      ă: 'a',
      Ă: 'A'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
