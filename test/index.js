import blons from 'big-list-of-naughty-strings'
import test from 'ava'
import pxd from '../dist/index'

const testData = {
  valid: [
    {
      input: 'PT1004199059S',
      output: 1004199059
    },
    {
      input: 'PT130S',
      output: 130
    },
    {
      input: 'PT2M10S',
      output: 130
    },
    {
      input: 'P1DT2S',
      output: 86402
    },
    {
      input: '-P1Y',
      output: -31536000
    },
    {
      input: 'P1Y2M3DT5H20M30.123S',
      output: 37070430.123
    },
    {
      input: 'P2Y6M5DT12H35M30S',
      output: 79317330
    },
    {
      input: 'P1DT2H',
      output: 93600
    },
    {
      input: 'P20M',
      output: 52560000
    },
    {
      input: 'PT20M',
      output: 1200
    },
    {
      input: 'P0Y20M0D',
      output: 52560000
    },
    {
      input: '-P60D',
      output: -5184000
    },
    {
      input: 'PT1M30.5S',
      output: 90.5
    },
    {
      input: 'P0Y',
      output: 0
    },
    {
      input: 'P0M',
      output: 0
    },
    {
      input: 'P0D',
      output: 0
    },
    {
      input: 'PT0H',
      output: 0
    },
    {
      input: 'PT0M',
      output: 0
    },
    {
      input: 'PT0S',
      output: 0
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
  testData.valid.forEach(({ input, output }) => {
    t.true(pxd(input) === output)
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
