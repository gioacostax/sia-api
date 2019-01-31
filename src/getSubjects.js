/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const https = require('https');
const utils = require('./utils');

/**
 * Promesa que devuelve los resultados de asignaturas de acuerdo a los parametros establecidos.
 *
 * @param  {String} keyword
 * @param  {Object} options
 * @return {Promise}
 */
module.exports = (
  keyword, // Palabra clave que se quiere buscar
  {
    host = 'https://siabog.unal.edu.co/buscador/JSON-RPC', // URL de la sede
    filter = [], level = '', type = '', plan = '', noPag = 1, noRes = 15, // Opciones de búsqueda
    eco = '', // URL del servidor sia-eco
    id = 'siajs' // Identificador del cliente
  } = {}
) => new Promise((resolve, reject) => {
  /**
   * Formato de solicitud original con parametros en formato de arreglo.
   *
   * Parametros:
   * keyword: Palabra clave que se quiere buscar.
   * level: Filtro de acuerdo al nivel del programa, ya sea 'PRE' o 'POS',
   *        este solo funciona si existe una tipología establecida en los parametros.
   * type: Tipología de búsqueda, existen: P, B, C, L, M, O, T.
   * PRE: Por alguna razón siempre está en nivel 'PRE', por eso es constante. Sin
   *      embargo, su variación no afecta los resultados.
   * plan: Filtro de acuerdo al código del programa.
   * filter: Filtro de horario del tipo personalizado.
   * noPag: El número de página que se quiere recibir, esto de acuerdo a la cantidad
   *        de resultados que se quiera mostrar. Habrá más páginas si 'noRes' es menor.
   * noRes: Número de resultados que se quiere recibir por página.
   */
  const query = `{ method: buscador.obtenerAsignaturas, params: [
    '${keyword}',
    '${level}',
    '${type}',
    'PRE',
    '${plan}',
    '${filter.length ? utils.parseFilter(filter) : ''}',
    ${noPag},
    ${noRes}
  ] }`;
  /**
   * Cuando el parametro 'eco' existe y su valor es diferente de '', se establece
   * que la url de destino pasa a ser un servidor 'sia-eco', su principal función
   * está en evitar las restricciones CORS de los navegadores.
   * Mas info: https://github.com/gioacostax/sia-eco
   */
  const url = eco || host;
  /**
   * La configuración en la función 'fetch' establece que es una petición POST,
   * cuyo contenido es del tipo 'application/json', si el destino es un servidor
   * sia-eco, el cuerpo de la petición tendrá un formato diferente al original,
   * donde se mandará un 'id' (identificador), el 'host' de la sede correspondiente,
   * y el formato de solicitud original. El parametro 'agent' evita el error
   * 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' cuando no se tiene un certificado de
   * seguridad válido para conexiones SSL.
   */
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: eco ? JSON.stringify({ id, host, query }) : query,
    agent: new https.Agent({ rejectUnauthorized: false })
  };

  fetch(url, config).then(res => res.json().then((json) => {
    /**
     * Para interpretarse correctamente la respuesta de 'json', este no debe
     * contener una llave de error (json.error). Por ahora se desconoce otros
     * posibles errores como sucede con '.getGroups()'.
     */
    if (json.error) {
      reject({ name: '[SIA] Formato de búsqueda inválido.', message: json });
    }

    /**
     * La respuesta original contiene el total de asignaturas encontradas bajo
     * los parametros establecidos y una cantidad de páginas dependiendo de la
     * cantidad de asignaturas por página que se configuró en los parametros.
     */
    const count = json.result.totalAsignaturas;
    const pags = json.result.numPaginas;

    /**
     * Cada una de las asignaturas en formato RAW pasa a ser un objeto con un
     * formato personalizado para mayor facilidad de lectura. Cada uno de las
     * asignaturas se guarda en un arreglo llamado 'subjects'.
     *
     * RAW Subject example:
     * {
     *   "creditos": 3,
     *   "tipologia": "M",
     *   "javaClass": "com.osmosyscol.academia.buscador.logica.dto.Asignatura",
     *   "nombre": "FOTOGRAFIA A COLOR",
     *   "grupos": {
     *     "list":[],
     *     "javaClass": "java.util.ArrayList"
     *   },
     *   "codigo": "19499",
     *   "id_asignatura":"2016893"
     * }
     */
    const subjects = json.result.asignaturas ? json.result.asignaturas.list.map(subject => ({
      id: subject.id_asignatura || 0,
      code: subject.codigo || 0,
      name: subject.nombre || '[NO DISPONIBLE]',
      type: subject.tipologia || '-',
      credits: subject.creditos || 0
    })) : [];

    /**
     * El resultado será un objeto con 3 llaves, cantidad de asignaturas
     * encontradas ('count'), cantidad de páginas ('pags'), y una listado
     * de esas asignaturas contenido en un arreglo.
     */
    resolve({ count, pags, list: subjects });
  }).catch(message => reject({ name: '[JSON] Interpretación de resultados fallida.', message })))
    .catch(message => reject({ name: '[FETCH] Solicitud de búsqueda fallida.', message }));
});
