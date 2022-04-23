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

  it('should replace slovak chars', function () {
    const charMap = {
      á: 'a',
      ä: 'a',
      č: 'c',
      ď: 'd',
      é: 'e',
      í: 'i',
      ľ: 'l',
      ĺ: 'l',
      ň: 'n',
      ó: 'o',
      ô: 'o',
      ŕ: 'r',
      š: 's',
      ť: 't',
      ú: 'u',
      ý: 'y',
      ž: 'z',
      Á: 'a',
      Ä: 'A',
      Č: 'C',
      Ď: 'D',
      É: 'E',
      Í: 'I',
      Ľ: 'L',
      Ĺ: 'L',
      Ň: 'N',
      Ó: 'O',
      Ô: 'O',
      Ŕ: 'R',
      Š: 'S',
      Ť: 'T',
      Ú: 'U',
      Ý: 'Y',
      Ž: 'Z'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
