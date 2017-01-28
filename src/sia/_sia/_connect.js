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
*
* This is a Cross Library for Web and Nodejs,
* nodejs needs a extra library and older browsers too
*/

require('es6-promise').polyfill();
require('isomorphic-fetch');

const Group = require('./_group');
const Subject = require('./_subject');

/**
* Tags
*/
const JSON_URL = '/buscador/JSON-RPC';
const JSON_RESULT = 'result';
const JSON_LIST = 'list';
const JSON_G_GET = 'buscador.obtenerGruposAsignaturas';
const JSON_S_GET = 'buscador.obtenerAsignaturas';
const JSON_S_SUBJECT = 'asignaturas';
const JSON_S_COUNT = 'totalAsignaturas';
const JSON_S_PAGS = 'numPaginas';

exports.getGroups = (host, params, { eco, id = 'default' } = {}, callback) => {
  const query = `{ method: ${JSON_G_GET}, params: ${params} }`;

  let url = `${host}${JSON_URL}`;
  let config = {
    method: 'POST',
    body: query
  };

  if (eco) {
    url = eco;
    config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, host, query })
    };
  }

  fetch(`http://${url}`, config).then(res => {
    res.json().then(json => {
      if (json.error) {
        return callback(null, json.error);
      }
      const groups = [];

      for (let x = 0; x < json[JSON_RESULT][JSON_LIST].length; x++) {
        groups.push(new Group(json[JSON_RESULT][JSON_LIST][x]));
      }

      return callback(groups, null);
    }).catch(err => callback(null, err));
  }).catch(err => callback(null, err));
};

exports.getSubjects = (host, params, { eco, id = 'default' } = {}, callback) => {
  const query = `{ method: ${JSON_S_GET}, params: ${params} }`;

  let url = `${host}${JSON_URL}`;
  let config = {
    method: 'POST',
    body: query
  };

  if (eco) {
    url = eco;
    config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, host, query })
    };
  }

  fetch(`http://${url}`, config).then(res => {
    res.json().then(json => {
      if (json.error) {
        return callback(null, json.error);
      }
      const subjects = [];
      const count = json[JSON_RESULT][JSON_S_COUNT];
      const pags = json[JSON_RESULT][JSON_S_PAGS];

      for (let x = 0; x < json[JSON_RESULT][JSON_S_SUBJECT][JSON_LIST].length; x++) {
        subjects.push(new Subject(json[JSON_RESULT][JSON_S_SUBJECT][JSON_LIST][x]));
      }

      return callback({ count, pags, list: subjects }, null);
    }).catch(err => callback(null, err));
  }).catch(err => callback(null, err));
};
