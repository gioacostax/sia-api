/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Transforma el horario de un objeto original a un filtro del tipo
 * personalizado (['L10', 'M10', 'M11', 'M12' ...]).
 *
 * @param  {Array} week
 * @return {Array}
 */
module.exports = (week) => {
  try {
    let res = [];

    for (let x = 0; x < week.length; x++) {
      let prefix = '';

      switch (x) {
        case 0:
          prefix = 'L';
          break;
        case 1:
          prefix = 'M';
          break;
        case 2:
          prefix = 'C';
          break;
        case 3:
          prefix = 'J';
          break;
        case 4:
          prefix = 'V';
          break;
        case 5:
          prefix = 'S';
          break;
        case 6:
          prefix = 'D';
          break;
        default:
          prefix = 'X';
          break;
      }
      if (week[x] !== '--') {
        for (let y = 0; y < week[x].length; y++) {
          const frame = week[x][y].split('-');
          const from = parseInt(frame[0], 10);
          const to = parseInt(frame[1], 10);

          const tmp = [];

          for (let z = from; z < to; z++) {
            tmp.push(`${prefix}${z}`);
          }

          res = res.concat(tmp);
        }
      }
    }

    return res;
  } catch (err) {
    return [];
  }
};
