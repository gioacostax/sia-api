'use strict';

/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parse array 'Group.Schedule' to ['L10', 'M10', 'M11', 'M12' ...]
 *
 * @param  {Array} schedule      List days
 * @return {Array} Result
 */
module.exports = schedule => {
  try {
    let res = [];

    for (let x = 0; x < schedule.length; x++) {
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

      if (schedule[x]) {
        for (let y = 0; y < schedule[x].hour.length; y++) {
          const frame = schedule[x].hour[y].split('-');
          const from = parseInt(frame[0]);
          const to = parseInt(frame[1]);

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
    return null;
  }
};
