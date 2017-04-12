// Regex taken from https://www.w3.org/TR/xmlschema11-2/#duration-lexical-space
const isValidXsdDuration = (str) => /^-?P((([0-9]+Y([0-9]+M)?([0-9]+D)?|([0-9]+M)([0-9]+D)?|([0-9]+D))(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S)))?)|(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S))))$/.test(str)

export default (input) => {
  // Throw error for non-string input
  if (typeof input !== 'string') {
    throw new TypeError('expected input to be a string')
  }
  // Return null for invalid input
  if (!isValidXsdDuration(input)) return null
  // TODO: Parse valid input
}
