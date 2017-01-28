/**
* Necessary modules
*
* This is a Cross Library for Web and Nodejs, nodejs needs a extra library
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

/**
* Get groups from a POST request
*
* @param  {String} url          Site URL
* @param  {String} params       Query POST params
* @param  {Function} callback   Callback
* @return {Function} callback
*/
exports.getGroups = (url, params, callback) => {
  const query = `{ method: ${JSON_G_GET}, params: ${params} }`;

  fetch(`http://${url}${JSON_URL}`, { method: 'POST', body: query }).then(res => {
    res.json().then(json => {
      if (json.error) {
        return callback(json.error, null);
      }
      const groups = [];

      for (let x = 0; x < json[JSON_RESULT][JSON_LIST].length; x++) {
        groups.push(new Group(json[JSON_RESULT][JSON_LIST][x]));
      }

      return callback(null, groups);
    }).catch(err => callback(err, null));
  }).catch(err => callback(err, null));
};

/**
* Get subjects from a POST request
*
* @param  {String} url          Site URL
* @param  {String} params       Query POST params
* @param  {Function} callback   Callback
* @return {Function} callback
*/
exports.getSubjects = (url, params, callback) => {
  const query = `{ method: ${JSON_S_GET}, params: ${params} }`;

  fetch(`http://${url}${JSON_URL}`, { method: 'POST', body: query }).then(res => {
    res.json().then(json => {
      if (json.error) {
        return callback(json.error, null);
      }
      const subjects = [];
      const count = json[JSON_RESULT][JSON_S_COUNT];
      const pags = json[JSON_RESULT][JSON_S_PAGS];

      for (let x = 0; x < json[JSON_RESULT][JSON_S_SUBJECT][JSON_LIST].length; x++) {
        subjects.push(new Subject(json[JSON_RESULT][JSON_S_SUBJECT][JSON_LIST][x]));
      }

      return callback(null, { count, pags, list: subjects });
    }).catch(err => callback(err, null));
  }).catch(err => callback(err, null));
};
