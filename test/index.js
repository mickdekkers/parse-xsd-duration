import blons from 'big-list-of-naughty-strings'
import test from 'ava'
import pxd from '../dist/index'

/**
 * ISO 8601
 * xsd:duration
 *
 * Example
 * -P2Y6M5DT12H35M30.4S
 *
 * The type xsd:duration represents a duration of time expressed as a number of years, months, days, hours,
 * minutes, and seconds. The format of xsd:duration is PnYnMnDTnHnMnS, where P is a literal value that starts
 * the expression, nY is the number of years followed by a literal Y, nM is the number of months followed by
 * a literal M, nD is the number of days followed by a literal D, T is a literal value that separates the date
 * and time, nH is the number of hours followed by a literal H, nM is the number of minutes followed by
 * a literal M, and nS is the number of seconds followed by a literal S
 *
 * The following rules apply to xsd:duration values:
 *
 * - Any of these numbers and corresponding designators may be absent if they are equal to 0, but at least one
 *   number and designator must appear.
 *
 * - The numbers may be any unsigned integer, with the exception of the number of seconds, which may be an
 *   unsigned decimal number.
 *
 * - If a decimal point appears in the number of seconds, there must be at least one digit after the decimal point.
 *
 * - A minus sign may appear before the P to specify a negative duration.
 *
 * - If no time items (hour, minute, second) are present, the letter T must not appear.
 *
 *
 * Examples:
 *
 *
 * Valid values                                     Comment
 *
 * P2Y6M5DT12H35M30S                                2 years, 6 months, 5 days, 12 hours, 35 minutes, 30 seconds
 * P1DT2H                                           1 day, 2 hours
 * P20M                                             20 months (the number of months can be more than 12)
 * PT20M                                            20 minutes
 * P0Y20M0D                                         20 months (0 is permitted as a number, but is not required)
 * P0Y                                              0 years
 * -P60D                                            minus 60 days
 * PT1M30.5S                                        1 minute, 30.5 seconds
 *
 * Invalid values                                   Comment
 *
 * P-20M                                            the minus sign must appear first
 * P20MT                                            no time items are present, so "T" must not be present
 * P1YM5D                                           no value is specified for months, so "M" must not be present
 * P15.5Y                                           only the seconds can be expressed as a decimal
 * P1D2H                                            "T" must be present to separate days and hours
 * 1Y2M                                             "P" must always be present
 * P2M1Y                                            years must appear before months
 * P                                                at least one number and designator are required
 * PT15.S                                           at least one digit must follow the decimal point if it appears
 */

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

const YEARS = 'years'
const MONTHS = 'months'
const DAYS = 'days'
const HOURS = 'hours'
const MINUTES = 'minutes'
const SECONDS = 'seconds'
const IS_NEGATIVE = 'isNegative'

const units = [YEARS, MONTHS, DAYS, HOURS, MINUTES, SECONDS, IS_NEGATIVE]

const testDataForObjects = {
  valid: [
    {
      input: 'P2Y6M5DT12H35M30S',
      expected: {
        [YEARS]: 2,
        [MONTHS]: 6,
        [DAYS]: 5,
        [HOURS]: 12,
        [MINUTES]: 35,
        [SECONDS]: 30,
        [IS_NEGATIVE]: false
      }
    },
    {
      input: 'P1DT2H',
      expected: {
        [YEARS]: 0,
        [MONTHS]: 0,
        [DAYS]: 1,
        [HOURS]: 2,
        [MINUTES]: 0,
        [SECONDS]: 0,
        [IS_NEGATIVE]: false
      }
    },
    {
      input: 'P20M',
      expected: {
        [YEARS]: 0,
        [MONTHS]: 20,
        [DAYS]: 0,
        [HOURS]: 0,
        [MINUTES]: 0,
        [SECONDS]: 0,
        [IS_NEGATIVE]: false
      }
    },
    {
      input: 'PT20M',
      expected: {
        [YEARS]: 0,
        [MONTHS]: 0,
        [DAYS]: 0,
        [HOURS]: 0,
        [MINUTES]: 20,
        [SECONDS]: 0,
        [IS_NEGATIVE]: false
      }
    },
    {
      input: 'P0Y20M0D',
      expected: {
        [YEARS]: 0,
        [MONTHS]: 20,
        [DAYS]: 0,
        [HOURS]: 0,
        [MINUTES]: 0,
        [SECONDS]: 0,
        [IS_NEGATIVE]: false
      }
    },
    {
      input: 'P0Y',
      expected: {
        [YEARS]: 0,
        [MONTHS]: 0,
        [DAYS]: 0,
        [HOURS]: 0,
        [MINUTES]: 0,
        [SECONDS]: 0,
        [IS_NEGATIVE]: false
      }
    },
    {
      input: '-P60D',
      expected: {
        [YEARS]: 0,
        [MONTHS]: 0,
        [DAYS]: 60,
        [HOURS]: 0,
        [MINUTES]: 0,
        [SECONDS]: 0,
        [IS_NEGATIVE]: true
      }
    },
    {
      input: 'PT1M30.5S',
      expected: {
        [YEARS]: 0,
        [MONTHS]: 0,
        [DAYS]: 0,
        [HOURS]: 0,
        [MINUTES]: 1,
        [SECONDS]: 30.5,
        [IS_NEGATIVE]: false
      }
    }
  ],
  invalid: [
    'P-20M',
    'P20MT',
    'P1YM5D',
    'P15.5Y',
    'P1D2H',
    '1Y2M',
    'P2M1Y',
    'P',
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

test('valid values should be parsed correctly for object', t => {
  testDataForObjects.valid.forEach(({ input, expected }) => {
    let resultObject = pxd(input, true)
    units.forEach((unit) => {
      t.true(resultObject[unit] === expected[unit])
    })
  })
})

test('invalid values should return null for object', t => {
  testDataForObjects.invalid.forEach((input) => {
    t.true(pxd(input, true) === null)
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
