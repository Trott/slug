/* global chai, describe, it, window */

var slug = (typeof window !== 'undefined' && window.slug) || require('../slug')
var assert = typeof chai === 'undefined' ? require('assert') : chai.assert

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
      const wordLengths = Array.from({ length: wordCount }, () => random(MAX_WORD_LENGTH))
      const codePoints = wordLengths.map((wordLength) => Array.from({ length: wordLength }, () => random(maxCodePoint)))
      const words = codePoints.map((wordCodePoints) => String.fromCodePoint(...wordCodePoints))
      return words.join(' ')
    }

    for (let i = 0; i < FUZZ_TESTS; i++) {
      let fuzzyString = getString(MAX_BMP_CODE_POINT)
      assert(slug(fuzzyString), fuzzyString)
      // TODO: Fix so we don't need to skip this in the browser. Maybe see the
      // "fixing" vesions of charCodeAt() in
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
      if (typeof window === 'undefined') {
        fuzzyString = getString(MAX_CODE_POINT)
        assert(slug(fuzzyString), fuzzyString)
      }
    }
  })
})
