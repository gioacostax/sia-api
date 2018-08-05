/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Libreria 'fetch' para entornos NodeJS.
 *
 * El objetivo de esta librería es utilizar de la misma manera la función fetch
 * tanto para entornos NodeJS como para navegores web (ya lo tienen incorporado).
 */
require('isomorphic-fetch');

const getGroups = require('./getGroups');
const getSubjects = require('./getSubjects');
const utils = require('./utils');

module.exports = {
  getGroups,
  getSubjects,
  utils
};

/**
 * Niveles de programa disponibles
 *
 * @type {Object}
 */
exports.LEVEL = {
  PRE: 'PREGRADO',
  POS: 'POSGRADO'
};

/**
 * Tipologías de asignaturas disponibles
 *
 * @type {Object}
 */
exports.TYPE = {
  P: 'NIVELACIÓN',
  B: 'FUNDAMENTACIÓN',
  C: 'DISCIPLINAR',
  L: 'LIBRE ELECCIÓN',
  M: 'MULTIPLES',
  O: 'OBLIGATORIO',
  T: 'ELEGIBLE'
};
