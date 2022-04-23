/* global btoa */
let base64

if (typeof window !== 'undefined') {
  if (window.btoa) {
    base64 = function (input) {
      return btoa(unescape(encodeURIComponent(input)))
    }
  } else {
    // Polyfill for environments that don't have btoa or Buffer class (notably, React Native).
    // Based on https://github.com/davidchambers/Base64.js/blob/a121f75bb10c8dd5d557886c4b1069b31258d230/base64.js
    base64 = function (input) {
      const str = unescape(encodeURIComponent(input + ''))
      let output = ''
      for (
        let block, charCode, idx = 0, map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        str.charAt(idx | 0) || (map = '=', idx % 1);
        output += map.charAt(63 & block >> 8 - idx % 1 * 8)
      ) {
        charCode = str.charCodeAt(idx += 3 / 4)
        // This is a coherence check. The result of unescape(encodeURIComponent()) should always be
        // characters with code points that fit into two bytes.
        /* c8 ignore next 3 */
        if (charCode > 0xFF) {
          throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.")
        }
        block = block << 8 | charCode
      }
      return output
    }
  }
} else {
  base64 = function (input) {
    return Buffer.from(input).toString('base64')
  }
}

function slug (string, opts) {
  let result = slugify(string, opts)
  const fallback = opts && opts.fallback !== undefined ? opts.fallback : slug.defaults.fallback
  // If output is an empty string, try slug for base64 of string.
  if (fallback === true && result === '') {
    result = slugify(base64(string), opts)
  }
  return result
}

function slugify (string, opts) {
  if (typeof string !== 'string') {
    throw new Error('slug() requires a string argument, received ' + typeof string)
  }
  if (!string.isWellFormed()) {
    throw new Error('slug() received a malformed string with lone surrogates')
  }
  if (typeof opts === 'string') { opts = { replacement: opts } }
  opts = opts ? Object.assign({}, opts) : {}
  opts.mode = opts.mode || slug.defaults.mode
  const defaults = slug.defaults.modes[opts.mode]
  const keys = ['replacement', 'multicharmap', 'charmap', 'remove', 'lower', 'trim']
  for (let key, i = 0, l = keys.length; i < l; i++) {
    key = keys[i]
    opts[key] = (key in opts) ? opts[key] : defaults[key]
  }

  let lengths = []
  for (const key in opts.multicharmap) {
    if (!Object.prototype.hasOwnProperty.call(opts.multicharmap, key)) { continue }

    const len = key.length
    if (lengths.indexOf(len) === -1) { lengths.push(len) }
  }

  // We want to match the longest string if there are multiple matches, so
  // sort lengths in descending order.
  lengths = lengths.sort(function (a, b) { return b - a })

  const disallowedChars = opts.mode === 'rfc3986' ? /[^\w\s\-.~]/ : /[^A-Za-z0-9\s]/

  let result = ''
  for (let char, i = 0, l = string.length; i < l; i++) {
    char = string[i]
    let matchedMultichar = false
    for (let j = 0; j < lengths.length; j++) {
      const len = lengths[j]
      const str = string.substr(i, len)
      if (opts.multicharmap[str]) {
        i += len - 1
        char = opts.multicharmap[str]
        matchedMultichar = true
        break
      }
    }
    if (!matchedMultichar) {
      if (opts.charmap[char]) {
        char = opts.charmap[char].replace(opts.replacement, ' ')
      } else if (char.includes(opts.replacement)) {
        // preserve the replacement character in case it is excluded by disallowedChars
        char = char.replace(opts.replacement, ' ')
      } else {
        char = char.replace(disallowedChars, '')
      }
    }
    result += char
  }

  if (opts.remove) {
    result = result.replace(opts.remove, '')
  }
  if (opts.trim) {
    result = result.trim()
  }
  result = result.replace(/\s+/g, opts.replacement) // convert spaces
  if (opts.lower) {
    result = result.toLowerCase()
  }
  return result
}

const initialMulticharmap = {
  // multibyte devanagari characters (hindi, sanskrit, etc.)
  फ़: 'Fi',
  ग़: 'Ghi',
  ख़: 'Khi',
  क़: 'Qi',
  ड़: 'ugDha',
  ढ़: 'ugDhha',
  य़: 'Yi',
  ज़: 'Za',
  // hebrew
  // Refs: http://www.eki.ee/wgrs/rom1_he.pdf
  // Refs: https://en.wikipedia.org/wiki/Niqqud
  בִי: 'i',
  בֵ: 'e',
  בֵי: 'e',
  בֶ: 'e',
  בַ: 'a',
  בָ: 'a',
  בֹ: 'o',
  וֹ: 'o',
  בֻ: 'u',
  וּ: 'u',
  בּ: 'b',
  כּ: 'k',
  ךּ: 'k',
  פּ: 'p',
  שׁ: 'sh',
  שׂ: 's',
  בְ: 'e',
  חֱ: 'e',
  חֲ: 'a',
  חֳ: 'o',
  בִ: 'i'
}

// https://github.com/django/django/blob/master/django/contrib/admin/static/admin/js/urlify.js
const initialCharmap = {
  // latin
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
  Ō: 'O',
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
  ō: 'o',
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

slug.charmap = Object.assign({}, initialCharmap)
slug.multicharmap = Object.assign({}, initialMulticharmap)
slug.defaults = {
  charmap: slug.charmap,
  mode: 'pretty',
  modes: {
    rfc3986: {
      replacement: '-',
      remove: null,
      lower: true,
      charmap: slug.charmap,
      multicharmap: slug.multicharmap,
      trim: true
    },
    pretty: {
      replacement: '-',
      remove: null,
      lower: true,
      charmap: slug.charmap,
      multicharmap: slug.multicharmap,
      trim: true
    }
  },
  multicharmap: slug.multicharmap,
  fallback: true
}

slug.reset = function () {
  slug.defaults.modes.rfc3986.charmap = slug.defaults.modes.pretty.charmap = slug.charmap = slug.defaults.charmap = Object.assign({}, initialCharmap)
  slug.defaults.modes.rfc3986.multicharmap = slug.defaults.modes.pretty.multicharmap = slug.multicharmap = slug.defaults.multicharmap = Object.assign({}, initialMulticharmap)
}

slug.extend = function (customMap) {
  const keys = Object.keys(customMap)
  const multi = {}
  const single = {}
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].length > 1) {
      multi[keys[i]] = customMap[keys[i]]
    } else {
      single[keys[i]] = customMap[keys[i]]
    }
  }
  Object.assign(slug.charmap, single)
  Object.assign(slug.multicharmap, multi)
}

export default slug
