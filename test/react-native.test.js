/* global after, before, describe, it */

// Only run in Node.js.
if (typeof window === 'undefined') {
  const assert = (await import('node:assert')).default

  describe('React Native-like environment', function () {
    before(function () {
      global.window = {}
    })
    after(function () {
      delete global.window
    })

    it('should work for window object with no btoa function', async function () {
      assert.strictEqual(window.btoa, undefined)
      const slug = (await import('../slug.js?cachebustingreactnative')).default
      assert.strictEqual(slug('鳄梨'), '6boe5qko')
      assert.strictEqual(slug(String.fromCodePoint(56714, 36991)), 'iombvw')
      assert.strictEqual(slug(String.fromCodePoint(56714)), 'ia')
      assert.strictEqual(slug(String.fromCodePoint(55296)), 'ia')
    })
  })
}
