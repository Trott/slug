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

  it('should replace georgian chars', function () {
    const charMap = {
      ა: 'a',
      ბ: 'b',
      გ: 'g',
      დ: 'd',
      ე: 'e',
      ვ: 'v',
      ზ: 'z',
      თ: 't',
      ი: 'i',
      კ: 'k',
      ლ: 'l',
      მ: 'm',
      ნ: 'n',
      ო: 'o',
      პ: 'p',
      ჟ: 'zh',
      რ: 'r',
      ს: 's',
      ტ: 't',
      უ: 'u',
      ფ: 'p',
      ქ: 'k',
      ღ: 'gh',
      ყ: 'q',
      შ: 'sh',
      ჩ: 'ch',
      ც: 'ts',
      ძ: 'dz',
      წ: 'ts',
      ჭ: 'ch',
      ხ: 'kh',
      ჯ: 'j',
      ჰ: 'h'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo' + char + ' bar baz'), 'foo' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
