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
      await queryInterface.addIndex('couponcodes', ['couponCode'], { transaction });
      await queryInterface.addIndex('couponcodes', ['isCouponActive'], { transaction });
      await queryInterface.addIndex('couponcodes', ['country'], { transaction });
     
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
      await queryInterface.removeIndex('couponcodes', ['couponCode'], { transaction });
      await queryInterface.removeIndex('couponcodes', ['isCouponActive'], { transaction });
      await queryInterface.removeIndex('couponcodes', ['country'], { transaction });
     
    });
  }
};
