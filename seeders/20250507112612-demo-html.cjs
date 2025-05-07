'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('html', [
      {
        name: 'homepage',
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Homepage</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-5">
    <h1 class="text-center">Welcome to Our Homepage</h1>
    <p class="lead text-center">We use Bootstrap for styling</p>
    <div class="text-center">
      <a class="btn btn-primary" href="/about">Learn More</a>
    </div>
  </div>
</body>
</html>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'about',
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-5">
    <h2>About Us</h2>
    <div class="card">
      <div class="card-body">
        <p class="card-text">This site demonstrates Bootstrap components stored in a database.</p>
      </div>
    </div>
  </div>
</body>
</html>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'contact',
        content: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Contact</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container mt-5">
    <h2>Contact Us</h2>
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Your Message</label>
        <textarea class="form-control" id="message" rows="4"></textarea>
      </div>
      <button type="submit" class="btn btn-success">Send</button>
    </form>
  </div>
</body>
</html>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('html', null, {});
  },
};
