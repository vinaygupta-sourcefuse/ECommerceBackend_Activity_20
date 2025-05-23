'use strict';

let dbm;
let type;
let seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('Orderitem', {
    id: {
      type: 'string',
      primaryKey: true,
      notNull: true
    },
    productsId: {
      type: 'text[]',
      notNull: true
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('Orderitem', callback);
};
