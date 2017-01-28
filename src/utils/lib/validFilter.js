/**
 * sia-js
 *
 * Copyright © 2015-2017 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Compare two filters, if first is on second go next, else return false.
 *
 * @param  {Array} hours    Hours for search
 * @param  {Array} filter   Filter to search
 * @return {Boolean} True or False
 */
module.exports = (hours, filter) => {
  try {
    for (let x = 0; x < hours.length; x++) {
      if (filter.indexOf(hours[x]) < 0) {
        return false;
      }
    }

    return true;
  } catch (err) {
    return null;
  }
};
