'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('users', 'athleteStatement', {
      type: Sequelize.TEXT('medium'),
      allowNull: true, 
    });


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // Revert to STRING(255)
    await queryInterface.changeColumn('users', 'athleteStatement', {
      type: Sequelize.STRING(255), 
      allowNull: true, 
    });


  }
};
