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

  it('should replace arabic characters', function () {
    assert.strictEqual(slug('مرحبا بك'), 'mrhba-bk')
    const charMap = {
      أ: 'a',
      إ: 'i',
      ب: 'b',
      ت: 't',
      ث: 'th',
      ج: 'g',
      ح: 'h',
      خ: 'kh',
      د: 'd',
      ذ: 'th',
      ر: 'r',
      ز: 'z',
      س: 's',
      ش: 'sh',
      ص: 's',
      ض: 'd',
      ط: 't',
      ظ: 'th',
      ع: 'aa',
      غ: 'gh',
      ف: 'f',
      ق: 'k',
      ك: 'k',
      ل: 'l',
      م: 'm',
      ن: 'n',
      ه: 'h',
      و: 'o',
      ي: 'y',
      ء: 'aa',
      ة: 'a',
      آ: 'a',
      ا: 'a',
      ک: 'k',
      ی: 'i'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo' + char + ' bar baz'), 'foo' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
