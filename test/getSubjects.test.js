/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const sia = require('../src');

describe('SIA.getSubjects()', () => {
  /*
   * Verifica que existan todas las propiedades dentro del objecto 'res',
   * incluyendo la del primer objeto del arreglo 'list'.
   */
  test('OK', () => sia.getSubjects('foto').then((res) => {
    expect(res).toHaveProperty('count');
    expect(res).toHaveProperty('pags');
    expect(res).toHaveProperty('list');
    expect(res.list[0]).toBeDefined();
    expect(res.list[0]).toHaveProperty('id');
    expect(res.list[0]).toHaveProperty('code');
    expect(res.list[0]).toHaveProperty('name');
    expect(res.list[0]).toHaveProperty('type');
    expect(res.list[0]).toHaveProperty('credits');
  }));

  /*
   * Verifica que existan todas las propiedades dentro del objecto 'res',
   * incluyendo la del primer objeto del arreglo 'list'.
   */
  test('OK ECO', () => sia.getSubjects('foto', { eco: 'https://sia-eco-1.herokuapp.com', id: 'test' })
    .then((res) => {
      expect(res).toHaveProperty('count');
      expect(res).toHaveProperty('pags');
      expect(res).toHaveProperty('list');
      expect(res.list[0]).toBeDefined();
      expect(res.list[0]).toHaveProperty('id');
      expect(res.list[0]).toHaveProperty('code');
      expect(res.list[0]).toHaveProperty('name');
      expect(res.list[0]).toHaveProperty('type');
      expect(res.list[0]).toHaveProperty('credits');
    }));

  /*
   * Verifica que existan todas las propiedades dentro del objecto 'res' cuando no se
   * establecen palabras claves de búsqueda, es frecuente cuando se quieren buscar
   * todas las asignaturas de un plan o tipología específico.
   */
  test('OK', () => sia.getSubjects().then((res) => {
    expect(res).toHaveProperty('count');
    expect(res).toHaveProperty('pags');
    expect(res).toHaveProperty('list');
  }));

  /**
   * Verifica el manejo de un error del tipo JSON, normalmente pasa cuando la URL
   * responde pero no con la información esperada.
   */
  test('HANDLE ERROR [JSON]', () => sia.getSubjects('foto', { url: 'https://falsaurl.com' })
    .catch((err) => {
      expect(err).toHaveProperty('name');
      expect(err).toHaveProperty('message');
      expect(err.name).toEqual('[JSON] Interpretación de resultados fallida.');
    }));

  /**
   * Verifica el manejo de un error del tipo JSON cuando los parametros están mal.
   */
  test('HANDLE ERROR [SIA]', () => sia.getSubjects('foto', { filter: [65] })
    .catch((err) => {
      expect(err).toHaveProperty('name');
      expect(err).toHaveProperty('message');
      expect(err.name).toEqual('[SIA] Formato de búsqueda inválido.');
    }));

  /**
   * Verifica el manejo de un error del tipo FETCH cuando el host está mal.
   */
  test('HANDLE ERROR [FETCH]', () => sia.getSubjects('foto', { host: 'ht' }).catch((err) => {
    expect(err).toHaveProperty('name');
    expect(err).toHaveProperty('message');
    expect(err.name).toEqual('[FETCH] Solicitud de búsqueda fallida.');
  }));
});
