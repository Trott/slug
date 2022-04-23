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

  it('should replace hebrew', function () {
    const charMap = {
      א: '',
      בּ: 'b',
      ב: 'v',
      גּ: 'g',
      ג: 'g',
      ד: 'd',
      דּ: 'd',
      ה: 'h',
      ו: 'v',
      ז: 'z',
      ח: 'h',
      ט: 't',
      י: 'y',
      כּ: 'k',
      ךּ: 'k',
      כ: 'kh',
      ך: 'kh',
      ל: 'l',
      מ: 'm',
      ם: 'm',
      נ: 'n',
      ן: 'n',
      ס: 's',
      ע: '',
      פּ: 'p',
      פ: 'f',
      ף: 'f',
      ץ: 'ts',
      צ: 'ts',
      ק: 'k',
      ר: 'r',
      שׁ: 'sh',
      שׂ: 's',
      תּ: 't',
      ת: 't',
      בְ: 'e',
      חֱ: 'e',
      חֲ: 'a',
      חֳ: 'o',
      בִ: 'i',
      בִי: 'i',
      בֵ: 'e',
      בֵי: 'e',
      בֶ: 'e',
      בַ: 'a',
      בָ: 'a',
      בֹ: 'o',
      וֹ: 'o',
      בֻ: 'u',
      וּ: 'u'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo' + char + ' bar baz'), 'foo' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })
})
