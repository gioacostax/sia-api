/**
 * sia-js
 *
 * Copyright © 2015-2017 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
* Necessary modules
*/
const com = require('./_sia/_connect');
const _utils = require('./utils');

exports.utils = _utils;

/**
 * String real names
 *
 * @type {Object}
 */
exports.NAME = {
  ama: 'Amazonia',
  bog: 'Bogotá',
  car: 'Caribe',
  man: 'Manizales',
  med: 'Medellín',
  ori: 'Orinoquia',
  pal: 'Palmira',
  tum: 'Tumaco'
};

/**
 * String names of available levels
 *
 * @type {Object}
 */
exports.LEVEL = {
  pre: 'PREGRADO',
  pos: 'POSGRADO'
};

/**
 * Subject types
 *
 * @type {Object}
 */
exports.TYPE = {
  p: 'NIVELACIÓN',
  b: 'FUNDAMENTACIÓN',
  c: 'DISCIPLINAR',
  l: 'LIBRE ELECCIÓN',
  m: 'MULTIPLES',
  o: 'OBLIGATORIO',
  t: 'ELEGIBLE'
};

/**
* Get Groups
*
* @param  {Number} code         Code of subject
* @param  {Object} host         { host = 'sia.bogota.unal.edu.co', eco, id }
* @param  {Object} options      { plan, filter} (Optional)
* @return  {Function} Promise
*/
exports.getGroups = (
  code,
  { host = 'sia.bogota.unal.edu.co', eco, id } = {},
  { plan = null, filter = [] } = {}
) => {
  return new Promise((resolve, reject) => {
    com.getGroups(host, `[${code} , 0]`, { eco, id }, (res, err) => {
      if (!err) {
        const planFilter = [];

        if (plan) {
          for (let x = 0; x < res.length; x++) {
            if (res[x].limits.length) {
              for (let y = 0; y < res[x].limits.length; y++) {
                if (res[x].limits[y].plan === plan) {
                  if (filter.length) {
                    if (_utils.validFilter(_utils.parseSchedule(res[x].schedule), filter)) {
                      planFilter.push(res[x]);
                    }
                  } else {
                    planFilter.push(res[x]);
                  }
                }
              }
            } else {
              if (filter.length) {
                if (_utils.validFilter(_utils.parseSchedule(res[x].schedule), filter)) {
                  planFilter.push(res[x]);
                }
              } else {
                planFilter.push(res[x]);
              }
            }
          }
          resolve(planFilter);
        } else if (filter.length) {
          for (let x = 0; x < res.length; x++) {
            if (_utils.validFilter(_utils.parseSchedule(res[x].schedule), filter)) {
              planFilter.push(res[x]);
            }
          }
          resolve(planFilter);
        }
        resolve(res);
      }
      reject({ error: { name: err.name, code: err.code, message: err.message } });
    });
  });
};

/**
 * Get subjects
 *
 * @param  {String} search     Search key
 * @param  {Object} host        { host = 'sia.bogota.unal.edu.co', eco, id }
 * @param  {Object} options     { filter, level, type, plan, noPag, noRes} (Optional)
 * @return {Function} Promise
 */
exports.getSubjects = (
  search,
  { host = 'sia.bogota.unal.edu.co', eco, id } = {},
  { filter = [], level = '', type = '', plan = '', noPag = 1, noRes = 15 } = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      const params = `[
        '${search}',
        '${level}',
        '${type}',
        '${level}',
        '${plan}',
        '${filter.length ? _utils.parseFilter(filter) : ''}',
        ${noPag},
        ${noRes}
      ]`;

      com.getSubjects(host, params, { eco, id }, (res, err) => {
        if (!err) {
          resolve(res);
        }
        reject({ error: { name: err.name, code: err.code, message: err.message } });
      });
    } catch (err) {
      reject({ error: { name: err.name, code: err.code, message: err.message } });
    }
  });
};
