# [slug](https://github.com/Trott/slug)

Slugifies strings, even when they contain Unicode.

Make strings URL-safe.

- Respects [RFC 3986](https://tools.ietf.org/html/rfc3986)
- No dependencies
- Works in browser (window.slug) and AMD/CommonJS-flavoured module loaders

```
npm install slug
```

## Example

```javascript
var slug = require('slug')
var print = console.log.bind(console, '>')

print(slug('i love unicode'))
// > i-love-unicode

print(slug('i love unicode', '_')) // If you prefer something else than `-` as separator
// > i_love_unicode

slug.charmap['♥'] = 'freaking love' // change default charmap or use option {charmap:{…}} as 2. argument
print(slug('I ♥ UNICODE'))
// > i-freaking-love-unicode

// To reset modifications to slug.charmap, use slug.reset():
slug.reset()
print(slug('I ♥ UNICODE'))
// > i_unicode

print(slug('Telephone-Number')) // lower case by default
// > telephone-number

print(slug('Telephone-Number', {lower: false})) // If you want to preserve case
// > Telephone-Number

// We try to provide sensible defaults.
// So Cyrillic text will be transliterated as if it were Russian:
print(slug('маленький подъезд'))
// > malenkij-poduezd

// But maybe you know it's Bulgarian:
print(slug('маленький подъезд', { locale: 'bg' }))
// > malenykiy-podaezd

// To set the default locale:
slug.setLocale('bg')
print(slug('маленький подъезд'))
// > malenykiy-podaezd

print(slug('unicode is ☢'))
// > unicode-is

slug.extend({'☢': 'radioactive'})
print(slug('unicode ♥ is ☢'))
// > unicode-is-radioactive

// slug.extend() modifies the default charmap for the entire process.
// If you need to reset charmap, multicharmap, and the default locale, use slug.reset():

slug.reset()
print(slug('unicode ♥ is ☢'))
// > unicode-is

// Custom removal of characters from resulting slug. Let's say that we want to
// remove all numbers for some reason.
print(slug('one 1 two 2 three 3'))
// > one-1-two-2-three-3
print(slug('one 1 two 2 three 3', { remove: /[0-9]/g }))
// > one-two-three
```

## options

```javascript
// options is either object or replacement (sets options.replacement)
slug('string', [{options} || 'replacement']);
```

```javascript
slug.defaults.mode ='pretty';
slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multiple code unit characters
    trim: true             // trim leading and trailing replacement chars
};
slug.defaults.modes['pretty'] = {
    replacement: '-',
    remove: null,
    lower: false,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap
    trim: true              
};
```
