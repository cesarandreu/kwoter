
# shortr

## Thanks

Thanks to Michael Fogleman[http://code.activestate.com/recipes/576918/] for inspiring this

## What is shortr?

Node implementation for generating Tiny URL- and bit.ly-like URLs.

A bit-shuffling approach is used to avoid generating consecutive, predictable URLs.  However, the algorithm is deterministic and will guarantee that no collisions will occur.

The URL alphabet is fully customizable and may contain any number of characters.  By default, digits and lower-case letters are used, with some removed to avoid confusion between characters like o, O and 0.  The default alphabet is shuffled and has a prime number of characters to further improve the results of the algorithm.

The block size specifies how many bits will be shuffled. The lower BLOCK_SIZE bits are reversed.  Any bits higher than BLOCK_SIZE will remain as is. BLOCK_SIZE of 0 will leave all bits unaffected and the algorithm will simply be converting your integer to a different base.

The intended use is that incrementing, consecutive integers will be used as keys to generate the short URLs.  For example, when creating a new URL, the unique integer ID assigned by a database could be used to generate the URL by using this module.  Or a simple counter may be used.  As long as the same integer is not used twice, the same short URL will not be generated twice.

## Usage

Install the module:

```bash
$ npm install shortr
```

Try it out on the command line:

```bash
$ node
$ var shortr = require('shortr');
$ var encoded = shortr.encode_url(1);
$ console.log(encoded)
$ > nMvz6
```

## Known Issues

1. The code seems to break for number larger than 10737418239.
1. Comments are not very good
1. Test suite is not present at the moment


## Todo

* Decode Mechanism(should be simple enough)
* Solve large number issues(like > 10737418239[2^32])

## Dependencies

NONE as of now!

## Disclaimer

This project is just an experiment(at least at the moment), please contribute to make it better, and fee free to use it as you please.

## License

### The MIT License

Copyright (c) 2012 Samuel Vijaykumar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
