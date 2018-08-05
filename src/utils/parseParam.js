/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const parseWeek = require('./parseWeek');

/**
 * Transforma un filtro del tipo original ('L:M10-13,14-17:C:J10-13,14-17:V:S:D')
 * a un filtro del tipo personalizado. (['L10', 'M10', 'M11', 'M12' ...]).
 *
 * @param  {String} param
 * @return {Array}
 */
module.exports = (param) => {
  /**
   * Recorre el filtro original en formato String para identificar
   * los días con horas, despues los pasa a un formato de horario
   * personalizado para finalmente transformarlo en formato de filtro
   * personalizado.
   */
  try {
    const res = [];
    const day = param.split(':');

    for (let x = 0; x < day.length; x++) {
      day[x] = day[x].substring(1);
      const hour = day[x].split(',');

      if (hour[0]) {
        res[x] = hour;
      } else {
        res[x] = ['--'];
      }
    }

    return parseWeek(res);
  } catch (err) {
    return [];
  }
};
