/**
 * Copyright © 2015-2018 gioacostax. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/*
 * RAW JSON Example
 *
 * {
 *   "creditos": 3,
 *   "tipologia": "C",
 *   "javaClass": "com.osmosyscol.academia.buscador.logica.dto.Asignatura",
 *   "nombre": "FOTOGRAFIA A COLOR",
 *   "grupos": {
 *     "list":[],
 *     "javaClass": "java.util.ArrayList"
 *   },
 *   "codigo": "2016893",
 *   "id_asignatura":"2016893"
 * }
 */

/**
 * Subject Class
 */
module.exports = class Subject {
  constructor(json) {
    this.id       = json.id_asignatura || 0;
    this.code     = json.codigo || 0;
    this.name     = json.nombre || '[NO DISPONIBLE]';
    this.type     = json.tipologia || '-';
    this.credits  = json.creditos || 0;
  }
};
