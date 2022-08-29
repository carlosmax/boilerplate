'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('accounts', 'resetPasswordExpires', {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('accounts', 'resetPasswordExpires')
  }
};
