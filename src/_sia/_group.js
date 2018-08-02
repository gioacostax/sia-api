/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/*
 * RAW JSON Example:
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

/**
 * Group Class
 */
module.exports = class Group {
  constructor(json) {
    this.code     = json.codigo || 0;
    this.master   = json.nombredocente ===  '  ' ? '[NO DISPONIBLE]' : json.nombredocente;
    this.quota    = json.cupostotal || 0;
    this.free     = json.cuposdisponibles || 0;
    this.week     = this.parseWeek(json);
  }

  /*
   * Recorre un arreglo de días para identificar las horas correspondiente a cada una..
   */
  parseWeek(json) {
    const week = [
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado',
      'domingo'
    ].map(day => {
      /*
       * Dentro del formato original existen horas separados por espacios (' ')
       * que pasan a ser un arreglo en el día (index) correspondiente dentro del
       * arreglo 'week'. Si la hora es indefinida o contiene '--', este será
       * transformado de la misma manera al formato personalizado.
       */
      return json[`horario_${day}`]
        ? json[`horario_${day}`].split(' ')
        : ['--'];
    });

    /*
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
    return week;
  }
};
