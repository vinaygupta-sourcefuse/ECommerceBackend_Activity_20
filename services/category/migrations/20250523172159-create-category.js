'use strict';

exports.up = function (db) {
  return db.createTable('Category', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    name: {
      type: 'string',
      notNull: true
    },
    imageUrl: {
      type: 'string',
      notNull: false
    },
    description: {
      type: 'string',
      notNull: false
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  });
};

exports.down = function (db) {
  return db.dropTable('Category');
};
