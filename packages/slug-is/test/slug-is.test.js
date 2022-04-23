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
      Á: 'A',
      á: 'a',
      Ð: 'D',
      ð: 'd',
      É: 'E',
      é: 'e',
      Í: 'I',
      í: 'i',
      Ó: 'O',
      ó: 'o',
      Ú: 'U',
      ú: 'u',
      Ý: 'Y',
      ý: 'y',
      Þ: 'Th',
      þ: 'th',
      Æ: 'Ae',
      æ: 'ae',
      Ö: 'O',
      ö: 'o'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo' + char + ' bar baz'), 'foo' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
