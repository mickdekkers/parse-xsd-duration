const UNITS = {
  YEAR: 31536000,
  MONTH: 2628000,
  DAY: 86400,
  HOUR: 3600,
  MINUTE: 60,
  SECOND: 1
}

// Regex taken from https://www.w3.org/TR/xmlschema11-2/#duration-lexical-space
const isValidXsdDuration = (str) => /^-?P((([0-9]+Y([0-9]+M)?([0-9]+D)?|([0-9]+M)([0-9]+D)?|([0-9]+D))(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S)))?)|(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S))))$/.test(str)
const isNonEmptyString = (input) => (typeof input === 'string' && input.length > 0)
const isNegative = (str) => str[0] === '-'
const stripFirstChar = (str) => str.slice(1)
const unitToSeconds = (unit, amount) => UNITS[unit.toUpperCase()] * amount

const parseUnit = (unit, amount) => {
  const amt = parseFloat(amount)
  if (isNaN(amt)) return 0
  return unitToSeconds(unit, amt)
}

const parsePeriod = (period) => {
  const [, year, month, day] = ((/^(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?$/g).exec(period) || [])

  return parseUnit('year', year) +
    parseUnit('month', month) +
    parseUnit('day', day)
}

const parseTime = (time) => {
  const [, hour, minute, second] = ((/^(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/g).exec(time) || [])

  return parseUnit('hour', hour) +
    parseUnit('minute', minute) +
    parseUnit('second', second)
}

const parse = (str) => {
  const neg = isNegative(str)
  const duration = neg ? stripFirstChar(str) : str
  const splitDuration = duration.split('T')
  const period = stripFirstChar(splitDuration[0])
  const time = splitDuration[1]

  let output = 0
  if (isNonEmptyString(period)) output += parsePeriod(period)
  if (isNonEmptyString(time)) output += parseTime(time)
  return neg ? -output : output
}

export default (input) => {
  // Throw error for non-string input
  if (typeof input !== 'string') {
    throw new TypeError('expected input to be a string')
  }
  // Return null for invalid input
  if (!isValidXsdDuration(input)) return null
  // Parse valid input
  return parse(input)
}
