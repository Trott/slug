/* global chai, describe, it, window */

const slug = (typeof window !== 'undefined' && window.slug) || require('../slug')
const assert = typeof chai === 'undefined' ? require('assert') : chai.assert

describe('fuzz-testing slug', function () {
  it('should return truthy results for any valid string', function () {
    const FUZZ_TESTS = 64
    const MAX_WORD_LENGTH = 16
    const MAX_WORD_COUNT = 4

    const MAX_BMP_CODE_POINT = 0xFFFF
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
    const MAX_CODE_POINT = 0x10FFFF

    function random (max) {
      return Math.floor(Math.random() * max + 1)
    }

    function getString (maxCodePoint) {
      const wordCount = random(MAX_WORD_COUNT)
      const wordLengths = Array.from({ length: wordCount }, function () { return random(MAX_WORD_LENGTH) })
      const codePoints = wordLengths.map(function (wordLength) { return Array.from({ length: wordLength }, function () { return random(maxCodePoint) }) })
      const words = codePoints.map(function (wordCodePoints) { return String.fromCodePoint.apply(null, wordCodePoints) })
      return { fuzzyString: words.join(' '), codePoints }
    }

    for (let i = 0; i < FUZZ_TESTS; i++) {
      {
        const theString = getString(MAX_BMP_CODE_POINT)
        assert(slug(theString.fuzzyString), 'STRING: ' + theString.fuzzyString + '\nCODEPOINTS: ' + JSON.stringify(theString.codePoints))
      }

      {
        const theString = getString(MAX_CODE_POINT)
        assert(slug(theString.fuzzyString), 'STRING: ' + theString.fuzzyString + '\nCODEPOINTS: ' + JSON.stringify(theString.codePoints))
      }
    }
  })
})
