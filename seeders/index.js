const connection = require('../config/connection');
const { User } = require('../models');
const { dropAll } = require('./dropAll');
const { seedThoughts } = require('./thoughts');
const { seedUsers } = require('./users');

async function seedDb() {
  try {
    console.log('Dropping all collections');
    await dropAll();
    if (process.argv[2] !== '--dropOnly') {
      console.log('Seeding users');
      await seedUsers();
      console.log('Seeding thoughts');
      const thoughts = await seedThoughts();
      await Promise.all(
        thoughts.map((thought) =>
          User.findOneAndUpdate(
            { username: thought.username },
            {
              $push: {
                thoughts: thought._id,
              },
            }
          )
        )
      );
      console.log('Finished seeding database.\nExiting...');
    }
    connection.close(() => process.exit(0));
  } catch (error) {
    console.log(error);
    console.log(
      'An error occurred while attempting to seed the quotes.\nExiting...'
    );
    process.exit(1);
  }
}

connection.once('open', seedDb);
