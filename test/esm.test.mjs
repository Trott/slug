/* global describe, it */

import slug from '../slug.js'
import { expect } from '@esm-bundle/chai'

describe('esm wrapper', function () {
  it('should slugify strings', function () {
    expect(slug('foo bar baz')).to.equal('foo-bar-baz')
  })
})
