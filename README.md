# parse-xsd-duration [![Version](https://img.shields.io/npm/v/parse-xsd-duration.svg)][npm]
Parse XSD durations to seconds

## Installation

```bash
$ npm install parse-xsd-duration
```

Note: this package has zero dependencies and is provided in [UMD format][umd] so you can easily use it in the browser.

## Usage

```js
import pxd from 'parse-xsd-duration'

pxd('PT2M10S')
// => 130

pxd('P2Y6M5DT12H35M30S')
// => 79317330

pxd('P1Y2M3DT5H20M30.123S')
// => 37070430.123
```

## API

### `parse-xsd-duration(xsdDuration: string): number | null`

- Converts an XSD duration string to seconds.
- If the string is not a valid XSD duration, it will return `null`.
- If the input is not a string, it will throw a `TypeError`.

## License

MIT © [Mick Dekkers][mickdekkers-gh]

[npm]: https://www.npmjs.com/package/vue-howler
[umd]: https://github.com/umdjs/umd
[mickdekkers-gh]: https://github.com/soullesswaffle
