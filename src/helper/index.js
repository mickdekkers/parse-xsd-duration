import {
  allowedUnits,
  periodUnits,
  timeUnits,
  emptyPeriod,
  emptyTime,
  YEAR_UNIT,
  MONTH_UNIT,
  DAY_UNIT,
  HOUR_UNIT,
  MINUTE_UNIT,
  SECOND_UNIT,
  IS_NEGATIVE_UNIT,
  isValidXsdDuration
} from '../index'

const compareArrays = (array1, array2) =>
  array1.length === array2.length &&
  array1.sort().every((value, index) => value === array2.sort()[index])

const isCorrectKeys = obj => compareArrays(Object.keys(obj), allowedUnits)

const periodMatches = {
  [YEAR_UNIT]: 'Y',
  [MONTH_UNIT]: 'M',
  [DAY_UNIT]: 'D'
}

const timeMatches = {
  [HOUR_UNIT]: 'H',
  [MINUTE_UNIT]: 'M',
  [SECOND_UNIT]: 'S'
}

const getPart = (obj, initialObject, units, matches) => {
  const result = initialObject
  /**
   * All values must be number type
   */
  units.forEach(unit => {
    const inputValue = obj[unit]
    result[unit] = typeof inputValue === 'number' ? inputValue : 0
  })
  let resultString = ''
  units.forEach(unit => {
    const inputValue = result[unit]
    resultString += inputValue + matches[unit]
  })
  return resultString
}

const getPeriod = obj => getPart(obj, emptyPeriod, periodUnits, periodMatches)

const getTime = obj => getPart(obj, emptyTime, timeUnits, timeMatches)

const isValidObject = obj => {
  if (typeof obj !== 'object') {
    throw new TypeError('expected input to be a object')
  }
  return isCorrectKeys(obj)
}

export const objectToDuration = obj => {
  if (!isValidObject(obj)) return null
  const negative = obj[IS_NEGATIVE_UNIT] ? '-' : ''
  const periodStr = 'P' + getPeriod(obj)
  const timeStr = 'T' + getTime(obj)
  const result = negative + periodStr + timeStr
  if (!isValidXsdDuration(result)) return null
  return result
}
