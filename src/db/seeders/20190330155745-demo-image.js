'use strict';

const Image = require('../models/image')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

  //  return queryInterface.bulkInsert('Images', [{
  //   name: 'my.png',
  //   svg: 'some svg here'
  // }], {});

    const image = Image.build({
      name: 'my.png',
      svg: 'some svg here'
    })

    return image.save()
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
