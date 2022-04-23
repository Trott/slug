/* global beforeEach, chai, describe, it */

import slug from '../slug.js'

let assert
if (typeof chai === 'undefined') {
  assert = (await import('node:assert')).default
} else {
  assert = chai.assert
}

describe('slug', function () {
  beforeEach(slug.reset)

  it('should replace lithuanian characters', function () { assert.strictEqual(slug('ąčęėįšųūžĄČĘĖĮŠŲŪŽ'), 'aceeisuuzaceeisuuz') })
})
