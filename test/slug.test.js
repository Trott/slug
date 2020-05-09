/* global describe, it */

const slug = require('../slug')

const assert = require('assert')

describe('slug', function () {
  it('requires an argument', function () {
    assert.throws(slug, { message: 'slug() requires a string argument' })
  })

  it('should replace whitespaces with replacement', function () {
    assert.strictEqual(slug('foo bar baz'), 'foo-bar-baz')
    assert.strictEqual(slug('foo bar baz', '_'), 'foo_bar_baz')
    assert.strictEqual(slug('foo bar baz', ''), 'foobarbaz')
  })

  it('should replace multiple spaces and dashes with a single instance by default', () => {
    assert.strictEqual(slug('foo  bar--baz'), 'foo-bar-baz')
  })

  it('should remove trailing space if any', () => assert.strictEqual(slug(' foo bar baz '), 'foo-bar-baz'))

  it('should remove punctuation by default', () => {
    const punctuation = ['*', '_', '+', '~', '.', ',', '[', ']', '(', ')', '\'', '"', '!', ':', '@']
    punctuation.forEach((symbol) => {
      assert.strictEqual(slug('foo ' + symbol + ' bar baz'), 'foo-bar-baz')
    })
    assert.strictEqual(slug('foo_bar. -baz!'), 'foobar-baz')
    assert.strictEqual(slug('foo_bar-baz!', { replacement: '_' }), 'foo_barbaz')
  })

  it('should consolidate hyphen and space chars', function () {
    assert.strictEqual(slug('foo- bar baz'), 'foo-bar-baz')
  })

  it('should leave allowed chars in rfc3986 mode', function () {
    const allowed = ['.', '_', '~']
    allowed.forEach((a) => {
      assert.strictEqual(slug(`foo ${a} bar baz`, { mode: 'rfc3986' }), `foo-${a}-bar-baz`)
    })
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
      ß: 'ss',
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
      ù: 'u',
      ú: 'u',
      û: 'u',
      ü: 'u',
      ű: 'u',
      ý: 'y',
      þ: 'th',
      ÿ: 'y',
      ẞ: 'SS'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace greek chars', function () {
    const charMap = {
      α: 'a',
      β: 'b',
      γ: 'g',
      δ: 'd',
      ε: 'e',
      ζ: 'z',
      η: 'h',
      θ: '8',
      ι: 'i',
      κ: 'k',
      λ: 'l',
      μ: 'm',
      ν: 'n',
      ξ: '3',
      ο: 'o',
      π: 'p',
      ρ: 'r',
      σ: 's',
      τ: 't',
      υ: 'y',
      φ: 'f',
      χ: 'x',
      ψ: 'ps',
      ω: 'w',
      ά: 'a',
      έ: 'e',
      ί: 'i',
      ό: 'o',
      ύ: 'y',
      ή: 'h',
      ώ: 'w',
      ς: 's',
      ϊ: 'i',
      ΰ: 'y',
      ϋ: 'y',
      ΐ: 'i',
      Α: 'A',
      Β: 'B',
      Γ: 'G',
      Δ: 'D',
      Ε: 'E',
      Ζ: 'Z',
      Η: 'H',
      Θ: '8',
      Ι: 'I',
      Κ: 'K',
      Λ: 'L',
      Μ: 'M',
      Ν: 'N',
      Ξ: '3',
      Ο: 'O',
      Π: 'P',
      Ρ: 'R',
      Σ: 'S',
      Τ: 'T',
      Υ: 'Y',
      Φ: 'F',
      Χ: 'X',
      Ψ: 'PS',
      Ω: 'W',
      Ά: 'A',
      Έ: 'E',
      Ί: 'I',
      Ό: 'O',
      Ύ: 'Y',
      Ή: 'H',
      Ώ: 'W',
      Ϊ: 'I',
      Ϋ: 'Y'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace turkish chars', function () {
    const charMap = {
      ş: 's',
      Ş: 'S',
      ı: 'i',
      İ: 'I',
      ç: 'c',
      Ç: 'C',
      ü: 'u',
      Ü: 'U',
      ö: 'o',
      Ö: 'O',
      ğ: 'g',
      Ğ: 'G'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace cyrillic chars', function () {
    const charMap = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'yo',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'j',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'c',
      ч: 'ch',
      ш: 'sh',
      щ: 'sh',
      ъ: 'u',
      ы: 'y',
      ь: '',
      э: 'e',
      ю: 'yu',
      я: 'ya',
      А: 'A',
      Б: 'B',
      В: 'V',
      Г: 'G',
      Д: 'D',
      Е: 'E',
      Ё: 'Yo',
      Ж: 'Zh',
      З: 'Z',
      И: 'I',
      Й: 'J',
      К: 'K',
      Л: 'L',
      М: 'M',
      Н: 'N',
      О: 'O',
      П: 'P',
      Р: 'R',
      С: 'S',
      Т: 'T',
      У: 'U',
      Ф: 'F',
      Х: 'H',
      Ц: 'C',
      Ч: 'Ch',
      Ш: 'Sh',
      Щ: 'Sh',
      Ъ: 'U',
      Ы: 'Y',
      Ь: '',
      Э: 'E',
      Ю: 'Yu',
      Я: 'Ya',
      Є: 'Ye',
      І: 'I',
      Ї: 'Yi',
      Ґ: 'G',
      є: 'ye',
      і: 'i',
      ї: 'yi',
      ґ: 'g'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      let expected = `foo-${replacement}-bar-baz`
      if (!replacement) { expected = 'foo-bar-baz' }
      assert.strictEqual(slug(`foo ${char} bar baz`), expected)
    }
  })

  it('should replace czech chars', function () {
    const charMap = {
      č: 'c',
      ď: 'd',
      ě: 'e',
      ň: 'n',
      ř: 'r',
      š: 's',
      ť: 't',
      ů: 'u',
      ž: 'z',
      Č: 'C',
      Ď: 'D',
      Ě: 'E',
      Ň: 'N',
      Ř: 'R',
      Š: 'S',
      Ť: 'T',
      Ů: 'U',
      Ž: 'Z'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace polish chars', function () {
    const charMap = {
      ą: 'a',
      ć: 'c',
      ę: 'e',
      ł: 'l',
      ń: 'n',
      ó: 'o',
      ś: 's',
      ź: 'z',
      ż: 'z',
      Ą: 'A',
      Ć: 'C',
      Ę: 'E',
      Ł: 'L',
      Ń: 'N',
      Ś: 'S',
      Ź: 'Z',
      Ż: 'Z'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace latvian chars', function () {
    const charMap = {
      ā: 'a',
      č: 'c',
      ē: 'e',
      ģ: 'g',
      ī: 'i',
      ķ: 'k',
      ļ: 'l',
      ņ: 'n',
      š: 's',
      ū: 'u',
      ž: 'z',
      Ā: 'A',
      Č: 'C',
      Ē: 'E',
      Ģ: 'G',
      Ī: 'I',
      Ķ: 'K',
      Ļ: 'L',
      Ņ: 'N',
      Š: 'S',
      Ū: 'U',
      Ž: 'Z'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace vietnamese chars', function () {
    const charMap = {
      Ạ: 'A',
      Ả: 'A',
      Ầ: 'A',
      Ấ: 'A',
      Ậ: 'A',
      Ẩ: 'A',
      Ẫ: 'A',
      Ằ: 'A',
      Ắ: 'A',
      Ặ: 'A',
      Ẳ: 'A',
      Ẵ: 'A',
      Ẹ: 'E',
      Ẻ: 'E',
      Ẽ: 'E',
      Ề: 'E',
      Ế: 'E',
      Ệ: 'E',
      Ể: 'E',
      Ễ: 'E',
      Ị: 'I',
      Ỉ: 'I',
      Ĩ: 'I',
      Ọ: 'O',
      Ỏ: 'O',
      Ồ: 'O',
      Ố: 'O',
      Ộ: 'O',
      Ổ: 'O',
      Ỗ: 'O',
      Ơ: 'O',
      Ờ: 'O',
      Ớ: 'O',
      Ợ: 'O',
      Ở: 'O',
      Ỡ: 'O',
      Ụ: 'U',
      Ủ: 'U',
      Ũ: 'U',
      Ư: 'U',
      Ừ: 'U',
      Ứ: 'U',
      Ự: 'U',
      Ử: 'U',
      Ữ: 'U',
      Ỳ: 'Y',
      Ỵ: 'Y',
      Ỷ: 'Y',
      Ỹ: 'Y',
      Đ: 'D',
      ạ: 'a',
      ả: 'a',
      ầ: 'a',
      ấ: 'a',
      ậ: 'a',
      ẩ: 'a',
      ẫ: 'a',
      ằ: 'a',
      ắ: 'a',
      ặ: 'a',
      ẳ: 'a',
      ẵ: 'a',
      ẹ: 'e',
      ẻ: 'e',
      ẽ: 'e',
      ề: 'e',
      ế: 'e',
      ệ: 'e',
      ể: 'e',
      ễ: 'e',
      ị: 'i',
      ỉ: 'i',
      ĩ: 'i',
      ọ: 'o',
      ỏ: 'o',
      ồ: 'o',
      ố: 'o',
      ộ: 'o',
      ổ: 'o',
      ỗ: 'o',
      ơ: 'o',
      ờ: 'o',
      ớ: 'o',
      ợ: 'o',
      ở: 'o',
      ỡ: 'o',
      ụ: 'u',
      ủ: 'u',
      ũ: 'u',
      ư: 'u',
      ừ: 'u',
      ứ: 'u',
      ự: 'u',
      ử: 'u',
      ữ: 'u',
      ỳ: 'y',
      ỵ: 'y',
      ỷ: 'y',
      ỹ: 'y',
      đ: 'd'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace currencies', function () {
    const charMap = {
      '€': 'euro',
      '₢': 'cruzeiro',
      '₣': 'french franc',
      '£': 'pound',
      '₤': 'lira',
      '₥': 'mill',
      '₦': 'naira',
      '₧': 'peseta',
      '₨': 'rupee',
      '₹': 'indian rupee',
      '₩': 'won',
      '₪': 'new shequel',
      '₫': 'dong',
      '₭': 'kip',
      '₮': 'tugrik',
      '₯': 'drachma',
      '₰': 'penny',
      '₱': 'peso',
      '₲': 'guarani',
      '₳': 'austral',
      '₴': 'hryvnia',
      '₵': 'cedi',
      '¢': 'cent',
      '¥': 'yen',
      元: 'yuan',
      円: 'yen',
      '﷼': 'rial',
      '₠': 'ecu',
      '¤': 'currency',
      '฿': 'baht',
      $: 'dollar'
    }
    for (const char in charMap) {
      let replacement = charMap[char]
      replacement = replacement.replace(' ', '-')
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace symbols in rfc3986 mode', function () {
    const charMap = {
      '©': 'c',
      œ: 'oe',
      Œ: 'OE',
      '∑': 'sum',
      '®': 'r',
      '∂': 'd',
      ƒ: 'f',
      '™': 'tm',
      '℠': 'sm',
      '…': '...',
      '˚': 'o',
      º: 'o',
      ª: 'a',
      '∆': 'delta',
      '∞': 'infinity',
      '♥': 'love',
      '&': 'and',
      '|': 'or',
      '<': 'less',
      '>': 'greater'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`,
        { mode: 'rfc3986' }),
                      `foo-${replacement}-bar-baz`.toLowerCase())
    }
  })

  it('should replace symbols in pretty mode', function () {
    const charMap = {
      '©': 'c',
      œ: 'oe',
      Œ: 'OE',
      '∑': 'sum',
      '®': 'r',
      '∂': 'd',
      ƒ: 'f',
      '™': 'tm',
      '℠': 'sm',
      '˚': 'o',
      º: 'o',
      ª: 'a',
      '∆': 'delta',
      '∞': 'infinity',
      '♥': 'love',
      '&': 'and',
      '|': 'or',
      '<': 'less',
      '>': 'greater'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should remove ellipsis in pretty mode', function () {
    const charMap = {
      '…': '...'
    }
    for (const char in charMap) {
      assert.strictEqual(slug(`foo ${char} bar baz`), 'foo-bar-baz')
    }
  })

  it('should strip … symbols in pretty mode', () => assert.strictEqual(slug('foo … bar baz'), 'foo-bar-baz'))

  it('should strip symbols', function () {
    const charMap = [
      '†', '“', '”', '‘', '’', '•'
    ]
    charMap.forEach((char) =>
      assert.strictEqual(slug(`foo ${char} bar baz`), 'foo-bar-baz'))
  })

  it('should replace unicode', function () {
    const charMap = {
      '☢': 'radioactive',
      '☠': 'skull-and-bones',
      '☤': 'caduceus',
      '☣': 'biohazard',
      '☭': 'hammer-and-sickle',
      '☯': 'yin-yang',
      '☮': 'peace',
      '☏': 'telephone',
      '☔': 'umbrella-with-rain-drops',
      '☎': 'telephone',
      '☀': 'sun-with-rays',
      '★': 'star',
      '☂': 'umbrella',
      '☃': 'snowman',
      '✈': 'airplane',
      '✉': 'envelope',
      '✊': 'raised-fist'
    }
    for (const char in charMap) {
      const replacement = charMap[char]
      assert.strictEqual(slug(`foo ${char} bar baz`), `foo-${replacement}-bar-baz`)
    }
  })

  it('should replace no unicode when disabled', function () {
    const charMap = '😹☢☠☤☣☭☯☮☏☔☎☀★☂☃✈✉✊'.split('')
    charMap.forEach((char) =>
      assert.strictEqual(slug(`foo ${char} bar baz`, { symbols: false }), 'foo-bar-baz'))
  })

  it('should allow altering the charmap', function () {
    const charmap = {
      f: 'ph', o: '0', b: '8', a: '4', r: '2', z: '5'
    }
    assert.strictEqual(slug('foo bar baz', { charmap }).toUpperCase(), 'PH00-842-845')
  })

  it('should replace lithuanian characters', () => assert.strictEqual(slug('ąčęėįšųūžĄČĘĖĮŠŲŪŽ'), 'aceeisuuzACEEISUUZ'))

  it('should replace multichars', () => assert.strictEqual(slug('w/ <3 && sugar || ☠'), 'with-love-and-sugar-or-skull-and-bones'))

  it('should be flavourable', function () {
    const text = "It's your journey ... we guide you through."
    const expected = 'Its-your-journey-we-guide-you-through'
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

  it('should replace arabic characters', () => assert.strictEqual(slug('مرحبا بك'), 'mrhba-bk'))

  it('should replace zh characters', () => assert.strictEqual(slug('鳄梨'), '6bOE5qKo'))
})
