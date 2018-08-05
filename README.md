# SIAJS

[![Build Status](https://img.shields.io/travis/gioacostax/sia-api.svg?style=flat-square)](https://travis-ci.org/gioacostax/sia-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![NPM Version](https://img.shields.io/npm/v/siajs.svg?style=flat-square)](https://www.npmjs.com/package/siajs)


SIA-API es una librería para NodeJS y navegadores que permite recuperar la información acedemica del SIA (Sistema de Información Academica) de la Universidad Nacional de Colombia.

## Instalación

```
npm install siajs --save
```

> La versión NPM utiliza la librería `isomorphic-fetch` lo que permite globalizar la función `fetch`como lo hacen los navegadores de manera nativa.

## Uso

La librería está dividida en 2 funciones principales:

- `.getSubjects()`
- `.getGroups()`

Ambas funciones trabajan por medio de [promesas](https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Promise), lo que permite tener un mejor manejo de resultados y errores.

#### Ejemplo:

``` javascript
const siajs = require('siajs');

siajs.getSubjects('foto').then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
```

## Documentación

### `.getSubjects(keyword [, options])`

#### `keyword` {String}

Palabra clave o número de la asignatura a buscar.

#### `[, options]` {Object}

##### `options.host` {String}

URL de la sede a la que se quiere realizar la búsqueda, actualmente existen 8 sedes, cada una de ellas con sus respectivas direcciones.

| NOMBRE |  HOST   |
| :------: | :-----: |
| Amazonía | `https://siaama.unal.edu.co/buscador/service/action.pub` |
| Bogotá | `https://siabog.unal.edu.co/buscador/service/action.pub` |
| Caribe | `https://siacar.unal.edu.co/buscador/service/action.pub` |
| Manizales | `https://siaman.unal.edu.co/buscador/service/action.pub` |
| Medellín | `https://siamed.unal.edu.co/buscador/service/action.pub` |
| Orinoquia | `https://siaori.unal.edu.co/buscador/service/action.pub` |
| Palmira | `https://siapal.unal.edu.co/buscador/service/action.pub` |
| Tumaco | `https://siatum.unal.edu.co/buscador/service/action.pub` |

##### `options.level` {String}

Filtro de acuerdo al nivel del programa, ya sea `'PRE'` (pregrado) o `'POS'` (posgrado), este sólo retornará resultados si existe una tipología (`options.type`) establecida en los parametros.

##### `options.type` {String}

Tipología de búsqueda de asignaturas, existen actualmente 4 para el nivel de pregrado, 2 para posgrado y 1 llamada "Multiples".

| TIPO     |  NOMBRE   |
| :------: | :-----: |
| `P` | Nivelación |
| `B` | Fundamentación |
| `C` | Disciplinar |
| `L` | Libre elección |
| `M` | Multiples |
| `O` | Obligatorio |
| `T` | Elegible |

##### `options.plan` {String}

Código del plan del cual sólo se quiere buscar asignaturas que sólo se encuentren disponibles para ese plan, ya sea de pregrado o posgrado.

##### `options.filter` {Array}

Filtro de horario del tipo personalizado. Este parametro debe ser un arreglo de cadenas de texto con formato de día y hora. Ejemplo: `['M7', 'M8', 'C7', 'C8']`, este arreglo se traduce a que solo se buscarán asignaturas con grupos que tengan clase estrictamente los días martes y miercoles de 7 a 9 de la mañana. El formato de cada cadena por lo tanto cumple de esta manera `<día><hora_militar>`, donde día pueden ser de lunes a domingo (`L` `M` `C` `J` `V` `S` `D`).
 
> Desde el 2018-1 los resultados de búsqueda para los grupos sólo retornarán horario hasta el sábado, sin embargo, el filtro funciona con los domingos.

##### `options.noPag` {Integer}

El número de página que se quiere recibir, esto de acuerdo a la cantidad de resultados que se quiera mostrar. Habrá más páginas si el parámetro `options.noRes` es menor. Por ejemplo, si se busca por la palabra clave "seminario", los resultados son 50 asignaturas que concuerdan con la palabra clave, `options.noRes = 10` y `options.noPag = 5`, mostrará por lo tanto los últimos 10 resultados.

##### `options.noRes` {Integer}

La cantidad de resultados que se quiere mostrar por página. Lo recomendable es que no sea un número menor a __50__ para evitar paquetes de datos elevados.

##### `options.eco` {String}

Cuando el parametro `options.eco` existe y su valor no es una cadena vacía, se establece que la url de destino pasa a ser un servidor `sia-eco`, su principal función está en evitar las restricciones CORS de los navegadores. Mas info: [https://github.com/gioacostax/sia-eco](https://github.com/gioacostax/sia-eco)

##### `options.id` {String}

Es un texto que identifica al cliente donde se está ejecutando la librería `siajs`. Sólo se registrará por parte del servidor SIA-ECO con fines de desarrollo y recolección de datos.

#### Resultados

La respuesta satisfactoria de una promesa `.getSubjects` tendrá la siguiente estructura:

```
{ count: 13,
  pags: 1,
  list:
   [ { id: '2016918',
       code: '18886',
       name: 'FOTOGRAFIA II',
       type: 'C',
       credits: 3 },
     { id: '2016062',
       code: '19398',
       name: 'FOTOGRAFIA III',
       type: 'C',
       credits: 3 },
       
       ...
```
Donde `count` hace referencia a la cantidad de asignaturas que coincidieron con los parámetros de búsqueda, `pags` hace referencia a la cantidad de páginas disponibles de acuerdo a la cantidad establecida en el parámetro `options.noRes`, y un arreglo `list` que contiene las asignaturas encontradas.

##### Estructura de asignatura `results.list[x]`

```
{ id: '2016918',
  code: '18886',
  name: 'FOTOGRAFIA II',
  type: 'C',
  credits: 3 
}
```

| LLAVE     |  DESCRIPCIÓN   |
| :------: | :-----: |
| `id` | Número identificador de asignatura |
| `code` | Código de asignatura (utilizado para la función `.getGroups` |
| `name` | Nombre de la asignatura |
| `type` | Tipología según nivel y programa académico |
| `credits` | Créditos de la asignatura |

### `.getGroups(code [, get options])`

#### `code` {String}

Código de asignatura de la cual se quieres extraer los datos de grupos disponibles.

> Este código es __diferente__ al ID que se muestran en los buscadores oficiales.

#### `[, options]` {Object}

##### `options.host` {String}

Igual al parametro de la función `.getSubjects`.

##### `options.filter` {Array}

Igual al parametro de la función `.getSubjects`.

##### `options.eco` {String}

Igual al parametro de la función `.getSubjects`.

##### `options.id` {String}

Igual al parametro de la función `.getSubjects`.

#### Resultados

La respuesta satisfactoria de una promesa `.getGroups` tendrá la siguiente estructura:

```
{ count: 1,
  list:
   [ { code: '1',
       master: 'OMAIRA ABADIA REY',
       quota: 15,
       free: 11,
       week: [Array] },
       
       ...
```
Donde `count` hace referencia a la cantidad de grupos que coincidieron con los parámetros de búsqueda, y un arreglo `list` que contiene cada uno de los grupos.

##### Estructura de grupo `results.list[x]`

```
{ 
  code: '1',
  master: 'OMAIRA ABADIA REY',
  quota: 15,
  free: 11,
  week: [
    [ '--' ],
    [ '7-10' ],
    [ '10-13' ],
    [ '--' ],
    [ '--' ],
    [ '--' ],
    [ '--' ] 
  ]
}
```

| LLAVE     |  DESCRIPCIÓN   |
| :------: | :-----: |
| `code` | Código de grupo |
| `master` | Nombre de docente |
| `quota` | Cupos en total |
| `free` | Cupos disponibles |
| `week` | Arreglo con un total de 7 elementos, cada uno representando el rango de horas de cada día de la semana |

### Manejo de errores

Tanto para `.getSubjects` como `.getGroups` la promesa en caso de error ejecutará un `.catch` que permitirá identificar los errores. Existen 3 tipos principales, del tipo __[FETCH]__ que lanzará errores de conección, del tipo [JSON] que lanzará errores de interpretación de resultados devueltos por la función `fetch`, y del tipo __[SIA]__ que lanzará errores de la librería SIAJS o del propio servidor SIA de la sede.

Su estructura es un objeto con dos propiedades: `error.name` y `error.message`, este último será el mensaje de error original. (Para mayor trazabilidad y facilidad de interpretación en fase de desarrollo)

## Utils

Adicional a las dos funciones principales, la librería tiene funciones adicionales de transformación de filtros, parametros, horarios, y una validador de filtro.

### `siajs.utils.parseFilter(filter)`

- `filter` {Array}
- `return` {String}

Transforma un filtro del tipo personalizado `['L10', 'M10', 'M11', 'M12' ...]` a un filtro del tipo original `'L:M10-13,14-17:C:J10-13,14-17:V:S:D'`.

### `siajs.utils.parseParam(param)`

- `param` {String}
- `return` {Array}

Transforma un filtro del tipo original `'L:M10-13,14-17:C:J10-13,14-17:V:S:D'` a un filtro del tipo personalizado `['L10', 'M10', 'M11', 'M12' ...]`.

### `siajs.utils.parseWeek(week)`

- `week` {Array}
- `return` {Array}

Transforma un arreglo de horarios del tipo personalizado `group.week` a un filtro del tipo personalizado (['L10', 'M10', 'M11', 'M12' ...]).

### `siajs.utils.validFilter(hours, filter)`

- `hours` {Array}
- `filter` {Array}
- `return` {Boolean}

Valida que todas las horas que se encuentran en el arreglo del tipo filtro personalizado `filter` se encuentren en el arreglo del tipo filtro personalizado `hours`.

----------
#### License MIT
