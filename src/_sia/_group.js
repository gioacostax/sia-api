'use strict';

/**
 * SIA-API
 *
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * RAW JSON Example
 *
 * {
 *   "javaClass": "com.osmosyscol.academia.buscador.logica.dto.Grupo",
 *   "nombredocente": "GABRIELA DEL SOL ABELLO BARBOSA",
 *   "horario_sabado": "--",
 *   "aula_domingo": "--",
 *   "horario_martes": "7-10",
 *   "aula_jueves": "217-215 217-403",
 *   "usuariodocente": "gdabellob",
 *   "planlimitacion": {
 *     'list':[
 *       {
 *         'plan': '2509',
 *         'javaClass': 'com.osmosyscol.academia.buscador.logica.dto.PlanLimitacion',
 *         'tipo_limitacion': 'A'
 *       }
 *     ],
 *     'javaClass': 'java.util.ArrayList'
 *   },
 *   "aula_martes": "217-303",
 *   "horario_lunes": "--",
 *   "aula_miercoles": "--",
 *   "cupostotal": 15,
 *   "aula_sabado": "--",
 *   "aula_viernes": "--",
 *   "horario_miercoles": "--",
 *   "cuposdisponibles": 8,
 *   "horario_jueves": "7-9 9-10",
 *   "horario_domingo": "--",
 *   "horario_viernes": "--",
 *   "aula_lunes": "--",
 *   "codigo": "2"
 * }
 */

const JSON_G_CODE     = 'codigo';
const JSON_G_MASTER   = 'nombredocente';
const JSON_G_USER     = 'usuariodocente';
const JSON_G_LIMITS   = 'planlimitacion';
const JSON_G_QUOTA    = 'cupostotal';
const JSON_G_FREE     = 'cuposdisponibles';

const JSON_G_PL_LIST  = 'list';
const JSON_G_PL_PLAN  = 'plan';
const JSON_G_PL_TYPE  = 'tipo_limitacion';

const JSON_G_S_PLACE  = 'aula_';
const JSON_G_S_HOUR   = 'horario_';
const JSON_G_S_DAYS   = [
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
  'domingo'
];

/**
 * Group Class
 */
module.exports = class Group {
  constructor(json) {
    this.code     = json[JSON_G_CODE] || 0;
    this.master   = json[JSON_G_MASTER] || '[NO DISPONIBLE]';
    this.user     = json[JSON_G_USER] || '-';
    this.quota    = json[JSON_G_QUOTA] || 0;
    this.free     = json[JSON_G_FREE] || 0;
    this.limits   = json[JSON_G_LIMITS] ? this.parseLimits(json[JSON_G_LIMITS]) : [];
    this.schedule = this.parseSchedule(json);
  }

  parseLimits(json) {
    const limits = [];

    for (let x = 0; x < json[JSON_G_PL_LIST].length; x++) {
      limits.push({
        plan: json[JSON_G_PL_LIST][x][JSON_G_PL_PLAN],
        type: json[JSON_G_PL_LIST][x][JSON_G_PL_TYPE]
      });
    }

    return limits;
  }

  parseSchedule(json) {
    const hours = [];

    for (let x = 0; x < JSON_G_S_DAYS.length; x++) {
      /*
       * Dentro del formato original existen horas y lugares separados por
       * un espacio (' '), si la hora o el lugar contienen '--' en su formato
       * original, este será transformado de la misma manera al formato personalizado.
       */
      const place = json[JSON_G_S_PLACE + JSON_G_S_DAYS[x]]
        ? json[JSON_G_S_PLACE + JSON_G_S_DAYS[x]].split(' ')
        : ['--'];
      const hour = json[JSON_G_S_HOUR + JSON_G_S_DAYS[x]]
        ? json[JSON_G_S_HOUR + JSON_G_S_DAYS[x]].split(' ')
        : ['--'];

      /*
       * Si no hay clase en un día se establece que sea null,
       * de esta manera siempre habrá un arreglo final de un tamaño
       * de 7 elementos, que representan cada uno de los días de la semana.
       */
      if (hour[0] === '--') {
        hours.push(null);
      } else {
        hours.push({
          place,
          hour
        });
      }
    }

    /*
     * El resultado será un arreglo con un formato similar a:
     * [
     *   null,
     *   { place: ['--', '--'], hour: ['7-10', '18-20'] },
     *   null,
     *   { place: ['217-302'], hour: ['7-10'] },
     *   null,
     *   null,
     *   null
     * ]
     */

    return hours;
  }
};
