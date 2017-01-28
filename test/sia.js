/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

const sia = require('../src/sia');
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
    let resGroups = [];

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
