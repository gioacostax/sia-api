/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const sia = require('../src');

describe('SIA', () => {
  test('Good values of .getSubjects()', () => {
    /*
     * Verifica que existan todas las propiedades dentro del objecto 'res',
     * incluyendo la del primer objeto del arreglo 'list'.
     */
    return sia.getSubjects('foto', { eco: 'https://sia-eco-1.herokuapp.com', id: 'test' }).then(res => {
      expect(res).toHaveProperty('count');
      expect(res).toHaveProperty('pags');
      expect(res).toHaveProperty('list');
      expect(res.list[0]).toBeDefined();
      expect(res.list[0]).toHaveProperty('id');
      expect(res.list[0]).toHaveProperty('code');
      expect(res.list[0]).toHaveProperty('name');
      expect(res.list[0]).toHaveProperty('type');
      expect(res.list[0]).toHaveProperty('credits');
    });
  });

  test('Error values of .getSubjects()', () => {
    // TODO
  });

  test('Good values of .getGroups()', () => {
    /*
     * Verifica que existan todas las propiedades dentro del primer
     * objeto del arreglo 'res'.
     */
    return sia.getGroups('12495', { eco: 'https://sia-eco-1.herokuapp.com', id: 'test' }).then(res => {
      expect(res[0]).toBeDefined();
      expect(res[0]).toHaveProperty('code');
      expect(res[0]).toHaveProperty('master');
      expect(res[0]).toHaveProperty('user');
      expect(res[0]).toHaveProperty('quota');
      expect(res[0]).toHaveProperty('free');
      expect(res[0]).toHaveProperty('limits');
      expect(res[0]).toHaveProperty('schedule');
    });
  });

  test('Error values of .getSubjects()', () => {
    // TODO
  });
});
