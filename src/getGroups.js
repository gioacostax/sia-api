/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const https = require('https');
const utils = require('./utils');

/**
 * Promesa que devuelve los grupos de una asignatura específica.
 *
 * @param  {String} code
 * @param  {Object} options
 * @return {Promise}
 */
module.exports = (
  code, // Código de la asignatura (DIFERENTE al código que se muestra en el buscador)
  {
    host = 'https://siabog.unal.edu.co/buscador/JSON-RPC', // URL de la sede
    filter = [], // Filtro de horario del tipo personalizado
    eco = '', // URL del servidor sia-eco
    id = 'siajs' // Identificador del cliente
  } = {}
) => new Promise((resolve, reject) => {
  /**
   * Formato de solicitud original con parametros en formato de arreglo, el
   * primer parametro hace referencia al código de la asignatura (DIFERENTE al
   * código que se muestra en el buscador), el segundo parametro no se identifica
   * su función, sin embargo, al ser diferente de '0' devuelve un resultado sin
   * listado, llevando al error (reject) de esta promesa.
   */
  const query = `{ method: buscador.obtenerGruposAsignaturas, params: [${code} , 0] }`;
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
     * contener una llave de error (json.error), y debe tener una llave llamada
     * 'json.result.list' que contiene un arreglo sin importar que esté vacío.
     */
    if (json.error || !json.result || !json.result.list) {
      reject({ name: '[SIA] Formato de búsqueda inválido.', message: json });
    }

    /**
     * Cada uno de los grupos en formato RAW pasa a ser un objeto con un
     * formato personalizado para mayor facilidad de lectura. Cada uno de los
     * grupos se guarda en un arreglo llamado 'groups'.
     *
     * RAW Group example:
     * {
     *   codigo: "1"
     *   cuposdisponibles: 3
     *   cupostotal: 15
     *   horario_jueves: "--"
     *   horario_lunes: "--"
     *   horario_martes: "--"
     *   horario_miercoles: "7-10 18-20"
     *   horario_sabado: "--"
     *   horario_viernes: "7-10"
     *   javaClass: "com.osmosyscol.academia.buscador.logica.dto.Grupo"
     *   nombredocente: "PEDRO ANTONIO SALAMANCA FIGUEROA"
     * }
     */
    let groups = json.result.list.map(group => ({
      code: group.codigo || 0,
      master: group.nombredocente === '  ' ? '[NO DISPONIBLE]' : group.nombredocente,
      quota: group.cupostotal || 0,
      free: group.cuposdisponibles || 0,
      week: [
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado',
        'domingo'
      ].map((day) => {
        /**
         * Dentro del formato original existen horas separados por espacios (' ')
         * que pasan a ser un arreglo en el día (index) correspondiente dentro del
         * arreglo 'week'. Si la hora es indefinida o contiene '--', este será
         * transformado de la misma manera al formato personalizado.
         */
        if (group[`horario_${day}`]) {
          return group[`horario_${day}`].split(' ');
        }
        return ['--'];

        /**
         * El resultado será un arreglo con un formato similar al siguiente:
         * [
         *   ['--'],
         *   ['7-10', '18-20'],
         *   ['--'],
         *   ['7-10'],
         *   ['--'],
         *   ['--'],
         *   ['--']
         * ]
         */
      })
    }));

    /**
     * En caso de que se reciba un filtro de horas dentro de los parametros de
     * la función, se evaluará si cada uno de los grupos se encuentra dentro de
     * ese filtro. De ser así se mantendrá en el arreglo 'groups'.
     */
    if (filter.length) {
      groups = groups.filter((group) => {
        if (utils.validFilter(utils.parseWeek(group.week), filter)) {
          return true;
        }

        return false;
      });
    }

    /**
     * El resultado será un objeto con 2 llaves, cantidad de grupos encontrados
     * ('count') ya filtrado, y una listado de esos grupos contenido en un arreglo.
     */
    resolve({ count: groups.length, list: groups });
  }).catch(message => reject({ name: '[JSON] Interpretación de resultados fallida.', message })))
    .catch(message => reject({ name: '[FETCH] Solicitud de búsqueda fallida.', message }));
});
