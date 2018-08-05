/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Valida que todas las horas que se encuentran en el arreglo del
 * tipo filtro personalizado (filter) se encuentren en el arreglo
 * del tipo filtro personalizado (hours).
 *
 * @param  {Array} hours
 * @param  {Array} filter
 * @return {Boolean}
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
    return false;
  }
};
