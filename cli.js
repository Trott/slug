#!/usr/bin/env node

import slug from './slug.js'

if (process.argv.length < 3) {
  console.log('Usage: slug <string>')
  process.exit(1)
}

console.log(slug(process.argv[2]))
