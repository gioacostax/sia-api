# SIAJS

Javascript library for requests academic information from National University of Colombia.

## How it works?

Basically the library connects to the REST API from SIA University and transforms the data into readable objects.

## Install

#### Bower

[https://github.com/siajs/sia-bower](https://github.com/siajs/sia-bowerhttps://github.com/siajs/sia-bower)

#### NPM

[https://github.com/siajs/sia-npm](https://github.com/siajs/sia-npm)

## Usage

The library is divided into 2 main functions:

- `sia.getSubjects()`
- `sia.getGroups()`

both functions return [promises](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise), `.then()` to get the results and `.catch()` to handle errors.

#### Example:

``` javascript
sia.getSubjects('foto', 'sia.bogota.unal.edu.co').then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
```

## API

### `.getSubjects(search, url[, options])`

#### Parameters

__search:__ search string that contains the name from a subject.

__url:__ url string to connect.

__options:__ optional object to filter the search.

##### `[, otpions]`

|  Name  |  Type   | Default   | Description                     |
| :------: | :-----: | ------------- | ------------------------------- |
| `level`  | String  | `''`          | *Specify the level (pre, pos)*            |
|  `type`  | String  | `''`          | *Specify the subjects type (p, b, c, l, m, o, t)*        |
|  `plan`  | String  | `''`          | *Specify code of plan*             |
| `filter` |  Array  | `[]`          | *Specify hours* |
| `noPag`  | Integer | `1`           | *Number of page*            |
| `noRes`  | Integer | `15`          | *Number of results*         |

### `.getGroups(code, url[, options])`

#### Parameters

__code:__ subject code.

__url:__ url string to connect.

__options:__ optional object to filter groups.

##### `[, otpions]`

|  Name  |  Type  | Default   | Description                     |
| :------: | :----: | ------------- | ------------------------------- |
|  `plan`  | String | `''`          | *Specify code of plan*             |
| `filter` | Array  | `[]`          | *Specify hours* |

## Development

If you want to collaborate in its development, set up your environment as follows:

###### 1. Fork this repo and clone with git

###### 2. Install dependencies

``` shell
$ npm install
```

###### 3. All ready, lets build...

``` shell
$ npm run build
```

###### 4. OK? Test!

``` shell
$ npm test
```

## License

The MIT License (MIT)

Copyright (c) 2015 - Giorgio Acosta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
