'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('accounts', 'resetPasswordToken', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('accounts', 'resetPasswordToken')
  }
};
