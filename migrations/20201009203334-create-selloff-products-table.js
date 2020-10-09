'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SelloffProducts', {
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      selloffId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Selloffs',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropDatabase('SelloffProducts');
  }
};
