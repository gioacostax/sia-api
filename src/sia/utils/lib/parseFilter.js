'use strict';

/**
 * Parse filter: ['L10', 'M10', 'M11', 'M12' ...] to param: 'L:M10-13,14-17:C:J10-13,14-17:V:S:D'
 *
 * @param  {Array} filter   Especial Filter
 * @return {String} result
 */
module.exports = filter => {
  try {
    const key = ['L', 'M', 'C', 'J', 'V', 'S', 'D'];
    let res = '';

    for (let x = 0; x < key.length; x++) {
      const day = [];

      for (let y = 0; y < filter.length; y++) {
        if (filter[y].charAt(0) === key[x]) {
          day.push(filter[y]);
        }
      }

      if (day.length) {
        let frame = [];
        let onFrame = false;
        const total = [];

        for (let y = 6; y < 22; y++) {
          const index = day.indexOf(key[x] + y);

          if (index >= 0) {
            onFrame = true;
            frame.push(y);
          } else if (onFrame) {
            total.push(`${frame[0]}-${parseInt(frame[frame.length - 1], 10) + 1}`);
            frame = [];
            onFrame = false;
          }
        }

        let tmp = '';

        for (let y = 0; y < total.length; y++) {
          tmp = `${tmp}${total[y]},`;
        }

        res = `${res}${key[x]}${tmp.substring(0, tmp.length - 1)}`;
      } else {
        res = `${res}${key[x]}`;
      }

      res = `${res}:`;
    }

    return res.substring(0, res.length - 1);
  } catch (err) {
    return null;
  }
};
