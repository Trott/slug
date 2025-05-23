/* global describe, it */

import slug from '../slug.js'
import { assert } from '@esm-bundle/chai'

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

    function runTest (maxCodePoint) {
      const theString = getString(maxCodePoint)
      if (theString.fuzzyString.isWellFormed()) {
        assert(slug(theString.fuzzyString), 'STRING: ' + theString.fuzzyString + '\nCODEPOINTS: ' + JSON.stringify(theString.codePoints))
      } else {
        assert.throws(() => { slug(theString.fuzzyString) }, 'slug() received a malformed string with lone surrogates', 'STRING: ' + theString.fuzzyString + '\nCODEPOINTS: ' + JSON.stringify(theString.codePoints))
      }
    }

    for (let i = 0; i < FUZZ_TESTS; i++) {
      runTest(MAX_BMP_CODE_POINT)
      runTest(MAX_CODE_POINT)
    }
  })
})
