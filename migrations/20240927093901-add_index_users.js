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

    // Add indexes these columns for Users table
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex('users', ['name'], { transaction });
      await queryInterface.addIndex('users', ['email'], { transaction });
      await queryInterface.addIndex('users', ['user_type'], { transaction });
      await queryInterface.addIndex('users', ['gender'], { transaction });
      await queryInterface.addIndex('users', ['nationality'], { transaction });
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */


    // Remove indexes these columns from Users table
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex('users', ['name'], { transaction });
      await queryInterface.removeIndex('users', ['email'], { transaction });
      await queryInterface.removeIndex('users', ['user_type'], { transaction });
      await queryInterface.removeIndex('users', ['gender'], { transaction });
      await queryInterface.removeIndex('users', ['nationality'], { transaction });
    });


  }
};
