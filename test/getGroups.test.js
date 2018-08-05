/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const sia = require('../src');

describe('SIA.getGroups()', () => {
  /*
   * Verifica que existan todas las propiedades dentro del objecto 'res',
   * incluyendo la del primer objeto del arreglo 'list'.
   */
  test('OK', () => sia.getGroups('12495').then((res) => {
    expect(res).toHaveProperty('count');
    expect(res).toHaveProperty('list');
    expect(res.list[0]).toBeDefined();
    expect(res.list[0]).toHaveProperty('code');
    expect(res.list[0]).toHaveProperty('master');
    expect(res.list[0]).toHaveProperty('quota');
    expect(res.list[0]).toHaveProperty('free');
    expect(res.list[0]).toHaveProperty('week');
  }));

  /*
   * Verifica que existan todas las propiedades dentro del objecto 'res',
   * incluyendo la del primer objeto del arreglo 'list'.
   */
  test('OK ECO', () => sia.getGroups('12495', { eco: 'https://sia-eco-1.herokuapp.com', id: 'test' })
    .then((res) => {
      expect(res).toHaveProperty('count');
      expect(res).toHaveProperty('list');
      expect(res.list[0]).toBeDefined();
      expect(res.list[0]).toHaveProperty('code');
      expect(res.list[0]).toHaveProperty('master');
      expect(res.list[0]).toHaveProperty('quota');
      expect(res.list[0]).toHaveProperty('free');
      expect(res.list[0]).toHaveProperty('week');
    }));

  /**
   * Verifica el manejo de un error cuando no se envía un código de asignatura.
   */
  test('HANDLE ERROR [SIA] (Empty params)', () => sia.getGroups().catch((err) => {
    expect(err).toHaveProperty('name');
    expect(err).toHaveProperty('message');
    expect(err.name).toEqual('[SIA] Formato de búsqueda inválido.');
  }));

  /**
   * Verifica el manejo de un error del tipo JSON cuando los parametros están mal.
   */
  test('HANDLE ERROR [SIA]', () => sia.getGroups('12495', { filter: [65] }).catch((err) => {
    expect(err).toHaveProperty('name');
    expect(err).toHaveProperty('message');
    expect(err.name).toEqual('[SIA] Formato de búsqueda inválido.');
  }));

  /**
   * Verifica el manejo de un error del tipo JSON, normalmente pasa cuando la URL
   * responde pero no con la información esperada.
   */
  test('HANDLE ERROR [JSON]', () => sia.getGroups('12495', { url: 'https://falsaurl.com' }).catch((err) => {
    expect(err).toHaveProperty('name');
    expect(err).toHaveProperty('message');
    expect(err.name).toEqual('[JSON] Interpretación de resultados fallida.');
  }));

  /**
   * Verifica el manejo de un error del tipo FETCH cuando el host está mal.
   */
  test('HANDLE ERROR [FETCH]', () => sia.getGroups('12495', { host: 'ht' }).catch((err) => {
    expect(err).toHaveProperty('name');
    expect(err).toHaveProperty('message');
    expect(err.name).toEqual('[FETCH] Solicitud de búsqueda fallida.');
  }));
});
