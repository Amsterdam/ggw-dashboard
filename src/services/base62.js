/*
 * Code copied from Atlas to decode base62 encoded headings in pano urls
 */

/**
 * The 62 characters that have been used for encoding
 * @type {string[]}
 */
const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

/**
 * Decodes a base62 encoded string into a number
 * @param s
 * @param len parameter used for recursive calls
 * @returns {number}
 */
export function decodeString (s, len = s.length) {
  if (len > 1) {
    const quotient = s.substr(0, len - 1)
    const remainder = s.charAt(len - 1)
    return 62 *
      decodeString(quotient, len - 1) +
      decodeString(remainder, 1)
  } else {
    return CHARSET.indexOf(s)
  }
}

/**
 * Convert a base62 encoded string value to an angle
 * Negative values are mapped to 360 - value
 * @param s
 * @param precision number of decimals (eg 100 precision 1 => 10.0)
 * @returns {number}
 */
export function base62DecodeAngle (s, precision) {
  if (s[0] === '-') {
    return 360 - decodeString(s.substring(1)) / Math.pow(10, precision)
  } else {
    return decodeString(s) / Math.pow(10, precision)
  }
}
