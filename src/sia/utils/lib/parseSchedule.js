
/**
 * Parse Group.Schedule to ['L10', 'M10', 'M11', 'M12' ...]
 *
 * @param  {Array} day      List days
 * @return {Array} Result
 */
module.exports = day => {
  try {
    let res = [];

    for (let x = 0; x < day.length; x++) {
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

      if (day[x]) {
        for (let y = 0; y < day[x].hour.length; y++) {
          const frame = day[x].hour[y].split('-');
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
    return null;
  }
};
