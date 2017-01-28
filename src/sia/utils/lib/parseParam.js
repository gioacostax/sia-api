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
*/
const parseSchedule = require('./parseSchedule');

/**
 * Parse param: 'L:M10-13,14-17:C:J10-13,14-17:V:S:D' to filter: ['L10', 'M10', 'M11', 'M12' ...]
 *
 * @param  {String} param   Params
 * @return {Array} Result
 */
module.exports = param => {
  try {
    const res = [];
    const day = param.split(':');

    for (let x = 0; x < day.length; x++) {
      day[x] = day[x].substring(1);
      const hour = day[x].split(',');

      if (hour[0]) {
        res[x] = { hour };
      } else {
        res[x] = null;
      }
    }

    return parseSchedule(res);
  } catch (err) {
    return null;
  }
};
