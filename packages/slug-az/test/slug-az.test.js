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

  it('should replace azerbaijani chars', function () {
    const charMap = {
      ç: 'c',
      ə: 'e',
      ğ: 'g',
      ı: 'i',
      ö: 'o',
      ş: 's',
      ü: 'u',
      Ç: 'C',
      Ə: 'E',
      Ğ: 'G',
      İ: 'I',
      Ö: 'O',
      Ş: 'S',
      Ü: 'U'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
