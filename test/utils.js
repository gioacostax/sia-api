/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const sia = require('../src/sia');
const expect = require('chai').expect;

describe('UTILS', () => {
  const day = [
    null,
    { place: ['217-305'], hour: ['7-10'] },
    null,
    { place: ['217-302'], hour: ['7-10'] },
    null,
    null,
    null
  ];

  const filter = ['M7', 'M8', 'M9', 'J7', 'J8', 'J9'];
  const param = 'L:M7-10:C:J7-10:V:S:D';

  it('.parseSchedule()', () => {
    expect(sia.utils.parseSchedule(day)).to.deep.equal(filter);
  });

  it('.dayValidFilter()', () => {
    expect(sia.utils.validFilter(['J9', 'M8'], filter)).to.be.true;
    expect(sia.utils.validFilter(['J11', 'M8'], filter)).to.not.be.true;
  });

  it('.parseParam()', () => {
    expect(sia.utils.parseParam(param)).to.deep.equal(filter);
  });

  it('.parseFilter()', () => {
    expect(sia.utils.parseFilter(filter)).to.deep.equal(param);
  });
});
