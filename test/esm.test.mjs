/* global describe, it */

import slug from '../slug.js'
import assert from 'assert'

describe('esm wrapper', function () {
  it('should slugify strings', function () {
    assert.strictEqual(slug('foo bar baz'), 'foo-bar-baz')
  })
})
