"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Database = use("Database");
const Model = use("Model");

class Property extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
  images() {
    return this.hasMany("App/Models/Image");
  }

  static scopeNearBy(query, latitude, longitude, distance) {
    const haverSine = `(6371 * acos(cos(radians(${latitude}))
    * cos(radians(latitude))
    * cos(radians(longitude)
    - radians(${longitude}))
    + sin(radians(${latitude}))
    * sin(radians(latitude))))`;
    return query
      .select("*", Database.raw(`${haverSine} as distance`))
      .whereRaw(`${haverSine} < ${distance}`);
  }
}

module.exports = Property;
