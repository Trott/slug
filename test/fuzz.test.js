/* global chai, describe, it, window */

const slug = (typeof window !== 'undefined' && window.slug) || require('../slug')
const assert = typeof chai === 'undefined' ? require('assert') : chai.assert

// IE11 polyfill
if (!Array.from) {
  Array.from = (function () {
    let symbolIterator
    try {
      symbolIterator = Symbol.iterator
        ? Symbol.iterator
        : 'Symbol(Symbol.iterator)'
    } catch (e) {
      symbolIterator = 'Symbol(Symbol.iterator)'
    }

    const toStr = Object.prototype.toString
    const isCallable = function (fn) {
      return (
        typeof fn === 'function' ||
              toStr.call(fn) === '[object Function]'
      )
    }
    const toInteger = function (value) {
      const number = Number(value)
      if (isNaN(number)) return 0
      if (number === 0 || !isFinite(number)) return number
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
    }
    const maxSafeInteger = Math.pow(2, 53) - 1
    const toLength = function (value) {
      const len = toInteger(value)
      return Math.min(Math.max(len, 0), maxSafeInteger)
    }

    const setGetItemHandler = function setGetItemHandler (isIterator, items) {
      const iterator = isIterator && items[symbolIterator]()
      return function getItem (k) {
        return isIterator ? iterator.next() : items[k]
      }
    }

    const getArray = function getArray (
      T,
      A,
      len,
      getItem,
      isIterator,
      mapFn
    ) {
      // 16. Let k be 0.
      let k = 0

      // 17. Repeat, while k < len… or while iterator is done (also steps a - h)
      // eslint-disable-next-line no-unmodified-loop-condition
      while (k < len || isIterator) {
        const item = getItem(k)
        const kValue = isIterator ? item.value : item

        if (isIterator && item.done) {
          return A
        } else {
          if (mapFn) {
            A[k] =
                          typeof T === 'undefined'
                            ? mapFn(kValue, k)
                            : mapFn.call(T, kValue, k)
          } else {
            A[k] = kValue
          }
        }
        k += 1
      }

      if (isIterator) {
        throw new TypeError(
          'Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1'
        )
      } else {
        A.length = len
      }

      return A
    }

    // The length property of the from method is 1.
    return function from (arrayLikeOrIterator /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      const C = this

      // 2. Let items be ToObject(arrayLikeOrIterator).
      const items = Object(arrayLikeOrIterator)
      const isIterator = isCallable(items[symbolIterator])

      // 3. ReturnIfAbrupt(items).
      if (arrayLikeOrIterator == null && !isIterator) {
        throw new TypeError(
          'Array.from requires an array-like object or iterator - not null or undefined'
        )
      }

      // 4. If mapfn is undefined, then let mapping be false.
      // eslint-disable-next-line no-void
      const mapFn = arguments.length > 1 ? arguments[1] : void undefined
      let T
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            'Array.from: when provided, the second argument must be a function'
          )
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2]
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      const len = toLength(items.length)

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      const A = isCallable(C) ? Object(new C(len)) : new Array(len)

      return getArray(
        T,
        A,
        len,
        setGetItemHandler(isIterator, items),
        isIterator,
        mapFn
      )
    }
  })()
}

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
      return { fuzzyString: words.join(' '), codePoints: codePoints }
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
