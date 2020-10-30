const slug = require('../slug')

const BENCHMARK_RUNS = 2048
const MAX_WORD_LENGTH = 16
const MAX_WORD_COUNT = 4

const MAX_ASCII_CODE_POINT = 128
const MAX_LATIN1_CODE_POINT = 256
const MAX_BMP_CODE_POINT = 0xFFFF
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
const MAX_CODE_POINT = 0x10FFFF

function random (max) {
  return Math.floor(Math.random() * max + 1)
}

function getString (maxCodePoint) {
  const wordCount = random(MAX_WORD_COUNT)
  const wordLengths = Array.from({ length: wordCount }, () => random(MAX_WORD_LENGTH))
  const codePoints = wordLengths.map((wordLength) => Array.from({ length: wordLength }, () => random(maxCodePoint)))
  const words = codePoints.map((wordCodePoints) => String.fromCodePoint(...wordCodePoints))
  return words.join(' ')
}

const strings = []
for (let i = 0; i < BENCHMARK_RUNS; i++) {
  strings.push(getString(MAX_ASCII_CODE_POINT))
  strings.push(getString(MAX_LATIN1_CODE_POINT))
  strings.push(getString(MAX_BMP_CODE_POINT))
  strings.push(getString(MAX_CODE_POINT))
}

console.time('bench')
for (let i = 0; i < strings.length; i++) {
  slug(strings[i])
}
console.timeEnd('bench')
