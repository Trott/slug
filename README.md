# [slug](https://github.com/Trott/slug)

Slugifies strings, even when they contain Unicode.

Make strings URL-safe.

- Respects [RFC 3986](https://tools.ietf.org/html/rfc3986)
- No dependencies
- Works in the browser or in Node.js

```
npm install slug
```

If you are using TypeScript you can install the accompanying types

```
npm install --save-dev @types/slug
```

## Example

```javascript
import slug from 'slug'
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
// > i-unicode

print(slug('Telephone-Number')) // lower case by default
// > telephone-number

print(slug('Telephone-Number', {lower: false})) // If you want to preserve case
// > Telephone-Number

print(slug('unicode is ☢'))
// > unicode-is

slug.extend({'☢': 'radioactive'})
print(slug('unicode ♥ is ☢'))
// > unicode-is-radioactive

// slug.extend() modifies the default charmap for the entire process.
// If you need to reset charmap and multicharmap, use slug.reset():

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
    multicharmap: slug.multicharmap, // replace multiple code unit characters
    trim: true,             // trim leading and trailing replacement chars
    fallback: true          // use base64 to generate slug for empty results
};
slug.defaults.modes['pretty'] = {
    replacement: '-',
    remove: null,
    lower: false,
    charmap: slug.charmap,
    multicharmap: slug.multicharmap,
    trim: true,
    fallback: true
};
```

## Differences between `slug` and `slugify` packages

Here are some key differences between this package and [`slugify`](https://github.com/simov/slugify).

- **Stability:** `slug` is ESM-only.  
  `slugify` supports CommonJS and ESM.
- **Defaults:** `slug` has the `lower` option enabled by default, lowercasing all slugs
  (`'On SALE'` becomes `'on-sale'`).  
  `slugify` has the `lower` option disabled by default (`'On SALE'` becomes `'On-SALE'`).
- **Symbols:** `slug` removes unrecognized symbols (`'$100'` becomes `'100'`, `'<5'` becomes `'5'`, etc.).  
  `slugify` maps them to words (`'$100'` becomes `'dollar100'`, `'<5'` becomes `'less5'`, etc.).
- **Empty Output:** `slug` will return a short, predictable hash (`'   '` becomes `'icag'` and `'🎉'` becomes `'8joiq'`).  
  `slugify` will return an empty string (`'   '` and `'🎉'` become `''`).

## Playground

A (painfully minimal) web playground is available at
https://trott.github.io/slug/. It doesn't allow you to specify options, so it's utility is minimal. Pull requests welcome to add the ability to
specify options.

There is also a (similarly minimal) CLI tool available via `npx slug`.
As with the web playground, it doesn't allow you to specify options, so
it's utility is minimal.
