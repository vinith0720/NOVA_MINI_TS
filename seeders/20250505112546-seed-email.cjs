'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'email',
      [
        {
          type: 'signup',
          subject: 'Welcome to Nova!',
          text: 'Thank you for signing up.',
          html: '<strong>Thank you for signing up.</strong>',
          cc: 'cc@example.com',
          bcc: 'bcc@example.com',
        },
        {
          type: 'newsletter',
          subject: 'Weekly Newsletter',
          text: 'Here is this week’s news.',
          html: '<p>Here is this week’s <b>news</b>.</p>',
          cc: 'newsletter-cc@example.com',
          bcc: 'newsletter-bcc@example.com',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('email', null, {});
  },
};
