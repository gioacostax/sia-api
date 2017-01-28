/**
* Necessary modules
*
* This is a Cross Library for Web and Nodejs, nodejs needs a extra library
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
* @param  {String} url          Site URL
* @param  {Object} options      { plan, filter} (Optional)
* @return  {Function} Promise   (then and catch)
*/
exports.getGroups = (code, url, { plan = null, filter = [] } = {}) => {
  return new Promise((resolve, reject) => {
    com.getGroups(url, `[${code} , 0]`, (err, res) => {
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
      reject(err);
    });
  });
};

/**
 * Get subjects
 *
 * @param  {String} search      Partial name of subject
 * @param  {String} url         Site URL
 * @param  {Object} options     { filter, level, type, plan, noPag, noRes} (Optional)
 * @return {Function} Promise   (then and catch)
 */
exports.getSubjects = (
  search,
  url,
  { filter = [], level = '', type = '', plan = '', noPag = 1, noRes = 15 } = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      const filtex = filter.length ? _utils.parseFilter(filter) : '';
      const params = `[
        '${search}',
        '${level}',
        '${type}',
        '${level}',
        '${plan}',
        '${filtex}',
        ${noPag},
        ${noRes}
      ]`;

      com.getSubjects(url, params, (err, res) => {
        if (!err) {
          resolve(res);
        }
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};
