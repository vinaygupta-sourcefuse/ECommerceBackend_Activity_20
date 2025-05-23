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
  db.createTable('Order', {
    id: { type: 'string', primaryKey: true, notNull: true },
    user_id: { type: 'string', notNull: true },
    status: { type: 'string', notNull: true },
    createdAt: { type: 'timestamp', notNull: false, defaultValue: new String('CURRENT_TIMESTAMP') },
    updatedAt: { type: 'timestamp', notNull: false, defaultValue: new String('CURRENT_TIMESTAMP') },
    subtotal: { type: 'decimal', notNull: false, defaultValue: 0 },
    taxAmount: { type: 'decimal', notNull: false, defaultValue: 0 },
    shippingAmount: { type: 'decimal', notNull: false, defaultValue: 0 },
    discountAmount: { type: 'decimal', notNull: false, defaultValue: 0 },
    grandTotal: { type: 'decimal', notNull: false, defaultValue: 0 },
    user_email: { type: 'string', notNull: false },
    shippingMethod: { type: 'string', notNull: false },
    shippingStatus: { type: 'string', notNull: false },
    trackingNumber: { type: 'string', notNull: false },
    shippedAt: { type: 'timestamp', notNull: false, defaultValue: new String('CURRENT_TIMESTAMP') },
    deliverAt: { type: 'timestamp', notNull: false, defaultValue: new String('CURRENT_TIMESTAMP') },
    shippingAddress: { type: 'string', notNull: false },
    name: { type: 'string', notNull: false },
    phone: { type: 'string', notNull: false },
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('Order', callback);
};
