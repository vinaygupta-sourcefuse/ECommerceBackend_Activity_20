
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create notifications table
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('md5(random()::text || clock_timestamp()::text)::uuid'),
        primaryKey: true,
        allowNull: false
      },
      subject: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      body: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      receiver: {
        type: Sequelize.JSON,
        allowNull: false
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sent: {
        type: Sequelize.DATE,
        allowNull: true
      },
      options: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      modified_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    }, {
      schema: 'main'
    });

    // Create notification_users table
    await queryInterface.createTable('notification_users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('md5(random()::text || clock_timestamp()::text)::uuid'),
        primaryKey: true,
        allowNull: false
      },
      notification_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'notifications',
            schema: 'main'
          },
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      action_meta: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deleted_on: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleted_by: {
        type: Sequelize.UUID,
        allowNull: true
      },
      created_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      modified_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    }, {
      schema: 'main'
    });

    // Create index for better query performance
    await queryInterface.addIndex('main.notification_users', ['user_id']);
    await queryInterface.addIndex('main.notification_users', ['notification_id']);
    await queryInterface.addIndex('main.notification_users', ['is_read']);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order
    await queryInterface.dropTable({
      tableName: 'notification_users',
      schema: 'main'
    });
    
    await queryInterface.dropTable({
      tableName: 'notifications',
      schema: 'main'
    });
  }
};