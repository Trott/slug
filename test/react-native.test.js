/* global after, before, describe, it */

// Only run in Node.js.
if (typeof window === 'undefined') {
  describe('React Native-like environment', function () {
    let slug

    before(function () {
      global.window = {}
      delete require.cache[require.resolve('../slug')]
    })
    after(function () {
      delete global.window
      delete require.cache[require.resolve('../slug')]
    })
    const assert = require('assert')

    it('should work for window object with no btoa function', function () {
      assert.strictEqual(window.btoa, undefined)
      slug = require('../slug')
      assert.strictEqual(slug('鳄梨'), '6boe5qko')
      assert.strictEqual(slug(String.fromCodePoint(56714, 36991)), 'iombvw')
      assert.strictEqual(slug(String.fromCodePoint(56714)), 'ia')
      assert.strictEqual(slug(String.fromCodePoint(55296)), 'ia')
    })
  })
}
