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
const JSON_S_ID = 'id_asignatura';
const JSON_S_CODE = 'codigo';
const JSON_S_NAME = 'nombre';
const JSON_S_TYPE = 'tipologia';
const JSON_S_CREDITS = 'creditos';

/**
 * Subject Class
 */
module.exports = class Subject {
  constructor(json) {
    this.id = json[JSON_S_ID];
    this.code = json[JSON_S_CODE];
    this.name = json[JSON_S_NAME];
    this.type = json[JSON_S_TYPE];
    this.credits = json[JSON_S_CREDITS];
  }
};
