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
  db.createTable('Product', {
    id: {
      type: 'string',
      primaryKey: true,
      notNull: true
    },
    name: {
      type: 'string',
      notNull: true
    },
    description: {
      type: 'string',
      notNull: true
    },
    price: {
      type: 'decimal',
      notNull: true
    },
    discount: {
      type: 'decimal',
      notNull: true
    },
    images: {
      type: 'text', // Store array of strings as JSON
      notNull: true
    },
    categoryId: {
      type: 'string',
      notNull: true
    },
    brandId: {
      type: 'string',
      notNull: true
    },
    stock: {
      type: 'int',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('Product', callback);
};
