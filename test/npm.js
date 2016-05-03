'use strict';

/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
/* eslint no-var: 0 */
/* eslint no-invalid-this: 0 */

const sia = require('../build/npm');
const expect = require('chai').expect;

describe('SIA', function callback() {
  this.timeout(5000);
  this.slow(3000);

  describe('.getSubjects()', () => {
    it('Values', done => {
      sia.getSubjects('foto', 'sia.bogota.unal.edu.co').then(res => {
        expect(res).to.not.be.empty;
        expect(res.list[0]).to.have.property('code');
        expect(res.list[0]).to.have.property('name');
        done();
      });
    });
  });

  describe('.getGroups()', () => {
    var resGroups = [];

    before(done => {
      sia.getGroups(2018484, 'sia.bogota.unal.edu.co').then(res => {
        resGroups = res;
        done();
      });
    });

    it('Values', () => {
      expect(resGroups).to.not.be.empty;
      expect(resGroups[0]).to.have.deep.property('user');
    });

    it('Schedule Parse ', () => {
      expect(resGroups[0]).to.have.deep.property('schedule');
    });

    it('Limit Parse', () => {
      expect(resGroups[0]).to.have.deep.property('limits');
    });
  });
});

describe('UTILS', () => {
  var day = [
    null,
    { place: ['217-305'], hour: ['7-10'] },
    null,
    { place: ['217-302'], hour: ['7-10'] },
    null,
    null,
    null
  ];

  var filter = ['M7', 'M8', 'M9', 'J7', 'J8', 'J9'];
  var param = 'L:M7-10:C:J7-10:V:S:D';

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
