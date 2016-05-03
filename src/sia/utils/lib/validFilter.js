'use strict';

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
