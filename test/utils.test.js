/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const sia = require('../src');

describe('UTILS', () => {
  // Arreglo de horario personalizado dentro de un grupo
  const week = [
    ['--'],
    ['7-10', '18-20'],
    ['--'],
    ['7-10'],
    ['--'],
    ['--'],
    ['--']
  ];

  const filter = ['M7', 'M8', 'M9', 'M18', 'M19', 'J7', 'J8', 'J9']; // Filtro personalizado
  const param = 'L:M7-10,18-20:C:J7-10:V:S:D'; // Filtro original

  /*
   * Verifica que la conversión del arreglo personalizado del horario
   * de un grupo a un arreglo del tipo filtro personalizado sea el correcto.
   */
  test('.parseWeek()', () => {
    expect(sia.utils.parseWeek(week)).toEqual(filter);
  });

  /*
   * Verifica que la hora y día ['<dia><hora>'] en un arreglo se encuentre
   * dentro del filtro, así mismo, si no se encuentra verificar que la
   * respuesta sea falsa.
   */
  test('.validFilter()', () => {
    expect(sia.utils.validFilter(['J9', 'M8'], filter)).toBeTruthy();
    expect(sia.utils.validFilter(['J11', 'M8'], filter)).toBeFalsy();
  });

  /*
   * Verifica que la conversión de un filtro original tenga los mismos
   * valores al filtro personalizado.
   */
  test('.parseParam()', () => {
    expect(sia.utils.parseParam(param)).toEqual(filter);
  });

  /*
   * Verifica que la conversión de un filtro personalizado tenga los mismos
   * valores al filtro original.
   */
  test('.parseFilter()', () => {
    expect(sia.utils.parseFilter(filter)).toEqual(param);
  });
});
