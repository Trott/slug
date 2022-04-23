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

  it('should replace serbian chars if locale provided', function () {
    const charMap = { ђ: 'dj', ј: 'j', љ: 'lj', њ: 'nj', ћ: 'c', џ: 'dz', đ: 'dj', Ђ: 'Dj', Ј: 'j', Љ: 'Lj', Њ: 'Nj', Ћ: 'C', Џ: 'Dz', Đ: 'Dj', ǉ: 'lj', ǋ: 'NJ', ǈ: 'LJ' }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
