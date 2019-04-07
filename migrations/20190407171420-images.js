'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', { 
      id: {
        type: Sequelize.INTEGER,
        primary: true,
        autoincrement: true
      },
      imagePath: Sequelize.STRING,
      mimetype: Sequelize.STRING,
      encoding: Sequelize.STRING,
      altText: Sequelize.STRING,
      svg: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
