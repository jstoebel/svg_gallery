'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imagePath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mimetype: {
        type: Sequelize.STRING,
        allowNull: false
      },
      encoding: {
        type: Sequelize.STRING,
        allowNull: false
      },
      altText: {
        type: Sequelize.STRING,
        allowNull: false
      },
      svg: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
