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
      await queryInterface.addIndex('statscampaigns', ['campaignId'], { transaction });
      await queryInterface.addIndex('statscampaigns', ['payment_id'], { transaction });
     
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
      await queryInterface.removeIndex('statscampaigns', ['campaignId'], { transaction });
      await queryInterface.removeIndex('statscampaigns', ['payment_id'], { transaction });
     
    });

  }
};
