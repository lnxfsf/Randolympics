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

    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex('campaigns', ['friendEmail'], { transaction });
      await queryInterface.addIndex('campaigns', ['supporterEmail'], { transaction });
      await queryInterface.addIndex('campaigns', ['payment_id'], { transaction });
     
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */


    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex('campaigns', ['friendEmail'], { transaction });
      await queryInterface.removeIndex('campaigns', ['supporterEmail'], { transaction });
      await queryInterface.removeIndex('campaigns', ['payment_id'], { transaction });
     
    });
  }
};
