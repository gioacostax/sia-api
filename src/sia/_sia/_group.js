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

const JSON_G_CODE = 'codigo';
const JSON_G_MASTER = 'nombredocente';
const JSON_G_USER = 'usuariodocente';
const JSON_G_LIMITS = 'planlimitacion';
const JSON_G_QUOTA = 'cupostotal';
const JSON_G_FREE = 'cuposdisponibles';

const JSON_G_PL_LIST = 'list';
const JSON_G_PL_PLAN = 'plan';
const JSON_G_PL_TYPE = 'tipo_limitacion';

const JSON_G_S_DAYS = ['lunes',
                       'martes',
                       'miercoles',
                       'jueves',
                       'viernes',
                       'sabado',
                       'domingo'
                      ];
const JSON_G_S_PLACE = 'aula_';
const JSON_G_S_HOUR = 'horario_';

/**
 * Group Class
 */
module.exports = class Group {
  constructor(json) {
    this.code = json[JSON_G_CODE];
    this.master = json[JSON_G_MASTER];
    this.user = json[JSON_G_USER];
    this.schedule = this.parseSchedule(json);
    this.limits = this.parseLimits(json[JSON_G_LIMITS]);
    this.quota = json[JSON_G_QUOTA];
    this.free = json[JSON_G_FREE];
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
      // Some have more than one place and hour, these are separated with a space
      const place = json[JSON_G_S_PLACE + JSON_G_S_DAYS[x]].split(' ');
      const hour = json[JSON_G_S_HOUR + JSON_G_S_DAYS[x]].split(' ');

      // If no place or hour, the day gonna be null
      if (place[0] === '--' || hour[0] === '--') {
        hours.push(null);
      } else {
        hours.push({
          place,
          hour
        });
      }
    }

    return hours;
  }
};
