/* global beforeEach, describe, it */

import slug from '../slug.js'
import { assert } from '@esm-bundle/chai'

describe('slug', function () {
  beforeEach(slug.reset)

  it('requires an argument', function () {
    assert.throws(slug, /slug\(\) requires a string argument/)
  })

  it('should replace whitespaces with replacement', function () {
    assert.strictEqual(slug('foo bar baz'), 'foo-bar-baz')
    assert.strictEqual(slug('foo bar baz', '_'), 'foo_bar_baz')
    assert.strictEqual(slug('foo bar baz', ''), 'foobarbaz')
  })

  it('should replace multiple spaces and dashes with a single instance', function () {
    assert.strictEqual(slug('foo  bar--baz'), 'foo-bar-baz')
  })

  it('should remove trailing space if any', function () { assert.strictEqual(slug(' foo bar baz '), 'foo-bar-baz') })

  it('should preserve leading/trailing replacement characters if option set', function () {
    assert.strictEqual(slug(' foo bar baz ', { trim: false }), '-foo-bar-baz-')
  })

  it('should remove punctuation by default', function () {
    const punctuation = ['*', '_', '+', '~', '.', ',', '[', ']', '(', ')', '\'', '"', '!', ':', '@']
    punctuation.forEach(function (symbol) {
      assert.strictEqual(slug('foo ' + symbol + ' bar baz'), 'foo-bar-baz')
    })
    assert.strictEqual(slug('foo_bar. -baz!'), 'foobar-baz')
    assert.strictEqual(slug('foo_bar-baz_bing!', { replacement: '_' }), 'foo_barbaz_bing')
  })

  it('should consolidate hyphen and space chars', function () {
    assert.strictEqual(slug('foo- bar baz'), 'foo-bar-baz')
  })

  it('should leave allowed chars in rfc3986 mode', function () {
    const allowed = ['.', '_', '~']
    allowed.forEach(function (a) {
      assert.strictEqual(slug('foo ' + a + ' bar baz', { mode: 'rfc3986' }), 'foo-' + a + '-bar-baz')
    })
  })

  it('should preserve punctuation added to charmap', function () {
    slug.charmap._ = '_'
    assert.strictEqual(slug('foo_bar baz'), 'foo_bar-baz')
  })

  it('should replace latin chars', function () {
    const charMap = {
      À: 'A',
      Á: 'A',
      Â: 'A',
      Ã: 'A',
      Ä: 'A',
      Å: 'A',
      Æ: 'AE',
      Ç: 'C',
      È: 'E',
      É: 'E',
      Ê: 'E',
      Ë: 'E',
      Ì: 'I',
      Í: 'I',
      Î: 'I',
      Ï: 'I',
      Ð: 'D',
      Ñ: 'N',
      Ò: 'O',
      Ó: 'O',
      Ô: 'O',
      Õ: 'O',
      Ö: 'O',
      Ő: 'O',
      Ø: 'O',
      Ù: 'U',
      Ú: 'U',
      Û: 'U',
      Ü: 'U',
      Ű: 'U',
      Ý: 'Y',
      Þ: 'TH',
      à: 'a',
      á: 'a',
      â: 'a',
      ã: 'a',
      ä: 'a',
      å: 'a',
      æ: 'ae',
      ç: 'c',
      è: 'e',
      é: 'e',
      ê: 'e',
      ë: 'e',
      ì: 'i',
      í: 'i',
      î: 'i',
      ï: 'i',
      ð: 'd',
      ñ: 'n',
      ò: 'o',
      ó: 'o',
      ô: 'o',
      õ: 'o',
      ö: 'o',
      ő: 'o',
      ø: 'o',
      Œ: 'OE',
      œ: 'oe',
      ù: 'u',
      ú: 'u',
      û: 'u',
      ü: 'u',
      ű: 'u',
      ý: 'y',
      þ: 'th',
      ÿ: 'y'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-' + replacement.toLowerCase() + '-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should remove ellipsis in pretty mode', function () {
    const charMap = {
      '…': '...'
    }
    for (const char in charMap) {
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-bar-baz', 'replacing \'' + char + '\'')
    }
  })

  it('should strip … symbols in pretty mode', function () { assert.strictEqual(slug('foo … bar baz'), 'foo-bar-baz') })

  it('should strip symbols', function () {
    const charMap = [
      '†', '“', '”', '‘', '’', '•'
    ]
    charMap.forEach(function (char) {
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-bar-baz', 'replacing \'' + char + '\'')
    })
  })

  it('should replace no unicode when disabled', function () {
    const charMap = ['😹', '☢', '☠', '☤', '☣', '☭', '☯', '☮', '☏', '☔', '☎', '☀', '★', '☂', '☃', '✈', '✉', '✊']
    charMap.forEach(function (char) {
      assert.strictEqual(slug('foo ' + char + ' bar baz'), 'foo-bar-baz', 'replacing \'' + char + '\'')
    })
  })

  it('should allow altering the charmap', function () {
    const charmap = {
      f: 'ph', o: '0', b: '8', a: '4', r: '2', z: '5'
    }
    assert.strictEqual(slug('foo bar baz', { charmap }), 'ph00-842-845')
  })

  it('should be flavourable', function () {
    const text = "It's your journey ... we guide you through."
    const expected = 'its-your-journey-we-guide-you-through'
    assert.strictEqual(slug(text, { mode: 'pretty' }), expected)
  })

  it('should default to lowercase in rfc3986 mode', function () {
    const text = "It's Your Journey We Guide You Through."
    const expected = 'its-your-journey-we-guide-you-through.'
    assert.strictEqual(slug(text, { mode: 'rfc3986' }), expected)
  })

  it('should allow disabling of lowercase', function () {
    const text = "It's Your Journey We Guide You Through."
    const expected = 'Its-Your-Journey-We-Guide-You-Through.'
    assert.strictEqual(slug(text, { mode: 'rfc3986', lower: false }), expected)
  })

  it('should replace zh characters', function () { assert.strictEqual(slug('鳄梨'), '6boe5qko') })

  it('should permit replacing custom characters using .extend()', function () {
    slug.extend({ '♥': 'love', '☢': 'radioactive' })
    assert.strictEqual(slug('unicode ♥ is ☢'), 'unicode-love-is-radioactive')
  })

  it('should handle multiple code point characters with .extend()', function () {
    slug.extend({ फ़: 'fhqwhgads' })
    assert.strictEqual(slug('फ़'), 'fhqwhgads')
  })

  it('consolidates repeated replacement characters from extend()', function () {
    // https://github.com/simov/slugify/issues/144
    assert.strictEqual(slug('day + night'), 'day-night')
    slug.extend({ '+': '-' })
    assert.strictEqual(slug('day + night'), 'day-night')
  })

  it('should ignore symbols if they are not in the charmap', function () {
    assert.strictEqual(slug('unicode ♥ is ☢'), 'unicode-is')
  })

  it('should throw on lone surrogates', function () {
    assert.throw(() => slug(String.fromCodePoint(56714, 36991)))
  })

  it('should throw on a lone low surrogate by itself', function () {
    assert.throws(() => slug(String.fromCodePoint(56714)))
  })

  it('should throw on a lone high surrogate by itself', function () {
    assert.throws(() => slug(String.fromCodePoint(55296)))
  })

  it('should ignore inherited properties in multicharmap', function () {
    const multicharmapPrototype = { justin: 'this-just-in' }
    function Multicharmap () {
      this.babysitter = 'dadbysitter'
    }
    Multicharmap.prototype = multicharmapPrototype

    const multicharmap = new Multicharmap()
    assert.strictEqual(multicharmap.justin, 'this-just-in')
    assert.strictEqual(slug('justin babysitter', { multicharmap }), 'justin-dadbysitter')
  })

  it('should respect the remove option', function () {
    assert.strictEqual(slug('food', { remove: /[od]/g }), 'f')
    assert.strictEqual(slug('one 1 two 2 three 3', { remove: /[0-9]/g }), 'one-two-three')
    assert.strictEqual(slug('one 1 two 2 three 3'), 'one-1-two-2-three-3')
  })

  it('should not mutate a passed options object', function () {
    const opts = {}
    slug('fhqwhgads', opts)
    assert.deepStrictEqual(opts, {})
  })

  it('should have charmaps reset by reset()', function () {
    function checkAll (expectedCharmap, expectedMulticharmap, comparison) {
      [slug, slug.defaults.modes.rfc3986, slug.defaults.modes.pretty, slug.defaults]
        .forEach(function (actual) {
          comparison(actual.charmap, expectedCharmap)
          comparison(actual.multicharmap, expectedMulticharmap)
        })
    }
    const charmap = slug.charmap
    const multicharmap = slug.multicharmap
    delete slug.charmap
    delete slug.defaults.modes.rfc3986.charmap
    delete slug.defaults.modes.pretty.charmap
    delete slug.defaults.charmap
    delete slug.multicharmap
    delete slug.defaults.modes.rfc3986.multicharmap
    delete slug.defaults.modes.pretty.multicharmap
    delete slug.defaults.multicharmap
    checkAll(undefined, undefined, assert.strictEqual)
    slug.reset()
    checkAll(charmap, multicharmap, assert.deepStrictEqual)
  })

  it('should use base64 fallback', function () {
    assert.strictEqual(slug('=)'), 'psk')
  })

  it('should return empty result when fallback is disabled', function () {
    assert.strictEqual(slug('=(', { fallback: false }), '')
  })
})
