# SIA-API

## v4.0.0

[![Build Status](https://travis-ci.org/gioacostax/sia-js.svg?branch=v2.0.0)](https://travis-ci.org/gioacostax/sia-js)

Javascript library for requests academic information from National University of Colombia.

## How it works?

Basically the library connects to the REST API from SIA University and transforms the data into readable objects.

Update:
- On version 2, now you can get data from a eco server, see https://github.com/gioacostax/sia-eco for more info.
- New way to get data.
- Deprecated Bower install.

## Install

#### NPM

`npm install siajs --save`

## Usage

The library is divided into 2 main functions:

- `sia.getSubjects()`
- `sia.getGroups()`

both functions return [promises](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise), `.then()` to get the results and `.catch()` to handle errors.

#### Example:

``` javascript
sia.getSubjects('foto').then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
```

Note: By default both functions get data from `sia.bogota.unal.edu.co`

## API

### `.getSubjects(search [, host options] [, get options])`

#### Parameters

__search:__ search string that contains the name from a subject.

__host options:__ optional object to connect.

__get options:__ optional object to filter the search.

##### `[, host otpions]`

| Name     |  Type   | Default                       | Description                      |
| :------: | :-----: | ----------------------------- | -------------------------------- |
| `host`   | String  | `'sia.bogota.unal.edu.co'`    | *Specify host to get sia data*   |
| `eco`    | String  | `''`                          | *Specify eco host to get data*   |
| `id`     | String  | `''`                          | *Specify id for log in eco host* |

##### `[, get otpions]`

|  Name  |  Type   | Default   | Description                     |
| :------: | :-----: | ------------- | ------------------------------- |
| `level`  | String  | `''`          | *Specify the level (pre, pos)*            |
|  `type`  | String  | `''`          | *Specify the subjects type (p, b, c, l, m, o, t)*        |
|  `plan`  | String  | `''`          | *Specify code of plan*             |
| `filter` |  Array  | `[]`          | *Specify hours* |
| `noPag`  | Integer | `1`           | *Number of page*            |
| `noRes`  | Integer | `15`          | *Number of results*         |

### `.getGroups(code [, host options] [, get options])`

#### Parameters

__code:__ subject code.

__host options:__ optional object to connect.

__get options:__ optional object to filter groups.

##### `[, host otpions]`

| Name     |  Type   | Default                       | Description                      |
| :------: | :-----: | ----------------------------- | -------------------------------- |
| `host`   | String  | `'sia.bogota.unal.edu.co'`    | *Specify host to get sia data*   |
| `eco`    | String  | `''`                          | *Specify eco host to get data*   |
| `id`     | String  | `''`                          | *Specify id for log in eco host* |

##### `[, otpions]`

|  Name  |  Type  | Default   | Description                     |
| :------: | :----: | ------------- | ------------------------------- |
|  `plan`  | String | `''`          | *Specify code of plan*             |
| `filter` | Array  | `[]`          | *Specify hours* |

----------
#### License MIT
