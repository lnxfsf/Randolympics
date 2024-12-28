'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // users table, add two columns, TikTok and YouTube links if they don't already exist
    const usersTable = await queryInterface.describeTable('users');
    if (!usersTable.tt_link) {
      await queryInterface.addColumn('users', 'tt_link', {
        type: Sequelize.STRING(255),
        allowNull: true, // Adjust as needed
      });
    }
    if (!usersTable.yt_link) {
      await queryInterface.addColumn('users', 'yt_link', {
        type: Sequelize.STRING(255),
        allowNull: true, // Adjust as needed
      });
    }

    // campaigns table, add two columns, TikTok and YouTube links if they don't already exist
    const campaignsTable = await queryInterface.describeTable('campaigns');
    if (!campaignsTable.tt_link) {
      await queryInterface.addColumn('campaigns', 'tt_link', {
        type: Sequelize.STRING(255),
        allowNull: true, // Adjust as needed
      });
    }
    if (!campaignsTable.yt_link) {
      await queryInterface.addColumn('campaigns', 'yt_link', {
        type: Sequelize.STRING(255),
        allowNull: true, // Adjust as needed
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove columns from users table
    await queryInterface.removeColumn('users', 'tt_link');
    await queryInterface.removeColumn('users', 'yt_link');

    // Remove columns from campaigns table
    await queryInterface.removeColumn('campaigns', 'tt_link');
    await queryInterface.removeColumn('campaigns', 'yt_link');
  },
};
