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

  it('should replace kazakh chars', function () {
    const charMap = {
      Ә: 'AE',
      ә: 'ae',
      Ғ: 'GH',
      ғ: 'gh',
      Қ: 'KH',
      қ: 'kh',
      Ң: 'NG',
      ң: 'ng',
      Ү: 'UE',
      ү: 'ue',
      Ұ: 'U',
      ұ: 'u',
      Һ: 'H',
      һ: 'h',
      Ө: 'OE',
      ө: 'oe'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
