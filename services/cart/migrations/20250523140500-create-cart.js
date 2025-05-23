'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('Cart', {
    id: { type: 'string', primaryKey: true, notNull: true },
    userid: { type: 'string', notNull: true },
    productsid: { type: 'string', notNull: true }, // JSON string of array
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('Cart', callback);
};
