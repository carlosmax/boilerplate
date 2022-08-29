'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('accounts', 'role', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('accounts', 'role')
  }
};
