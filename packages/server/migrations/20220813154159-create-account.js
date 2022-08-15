'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.createTable('account', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phone: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('account')
  }
};
