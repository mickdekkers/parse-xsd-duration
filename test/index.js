import blons from 'big-list-of-naughty-strings'
import test from 'ava'
import pxd from '../dist/index'

const testData = {
  valid: [
    {
      input: 'PT1004199059S',
      expected: 1004199059
    },
    {
      input: 'PT130S',
      expected: 130
    },
    {
      input: 'PT2M10S',
      expected: 130
    },
    {
      input: 'P1DT2S',
      expected: 86402
    },
    {
      input: '-P1Y',
      expected: -31536000
    },
    {
      input: 'P1Y2M3DT5H20M30.123S',
      expected: 37070430.123
    },
    {
      input: 'P2Y6M5DT12H35M30S',
      expected: 79317330
    },
    {
      input: 'P1DT2H',
      expected: 93600
    },
    {
      input: 'P20M',
      expected: 52560000
    },
    {
      input: 'PT20M',
      expected: 1200
    },
    {
      input: 'P0Y20M0D',
      expected: 52560000
    },
    {
      input: '-P60D',
      expected: -5184000
    },
    {
      input: 'PT1M30.5S',
      expected: 90.5
    },
    {
      input: 'P0Y',
      expected: 0
    },
    {
      input: 'P0M',
      expected: 0
    },
    {
      input: 'P0D',
      expected: 0
    },
    {
      input: 'PT0H',
      expected: 0
    },
    {
      input: 'PT0M',
      expected: 0
    },
    {
      input: 'PT0S',
      expected: 0
    }
  ],
  invalid: [
    '1Y',
    'P1S',
    'P-1Y',
    'P1M2Y',
    'P1Y-1M',
    'P-20M',
    'P20MT',
    'P1YM5D',
    'P15.5Y',
    'P1D2H',
    '1Y2M',
    'P2M1Y',
    'P',
    'T',
    'PT15.S'
  ]
}

// Add the Big List of Naughty Strings to the invalid data array
testData.invalid.concat(blons)

test('valid values should be parsed correctly', t => {
  testData.valid.forEach(({ input, expected }) => {
    t.true(pxd(input) === expected)
  })
})

test('invalid values should return null', t => {
  testData.invalid.forEach((input) => {
    t.true(pxd(input) === null)
  })
})

test('non-string arguments should throw TypeError', t => {
  t.throws(() => {
    pxd(42)
  }, TypeError)
  t.throws(() => {
    pxd(true)
  }, TypeError)
  t.throws(() => {
    pxd(null)
  }, TypeError)
  t.throws(() => {
    pxd(undefined)
  }, TypeError)
})
