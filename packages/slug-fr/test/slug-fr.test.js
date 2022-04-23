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

  it('should replace french characters', function () {
    const charMap = {
      À: 'A',
      à: 'a',
      Â: 'A',
      â: 'a',
      Æ: 'Ae',
      æ: 'ae',
      Ç: 'C',
      ç: 'c',
      É: 'E',
      é: 'e',
      È: 'E',
      è: 'e',
      Ê: 'E',
      ê: 'e',
      Ë: 'E',
      ë: 'e',
      Î: 'I',
      î: 'i',
      Ï: 'I',
      ï: 'i',
      Ô: 'O',
      ô: 'o',
      Œ: 'Oe',
      œ: 'oe',
      Ù: 'U',
      ù: 'u',
      Û: 'U',
      û: 'u',
      Ü: 'U',
      ü: 'u',
      Ÿ: 'Y',
      ÿ: 'y'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo' + char + ' bar baz'), 'foo' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
