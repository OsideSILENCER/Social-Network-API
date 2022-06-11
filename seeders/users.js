const { User } = require('../models');
const { Types } = require('mongoose');

const userData = {
  socrates: {
    username: 'socrates',
    email: 'socrates@email.com',
    friends: ['aristotle', 'plato'],
  },
  aristotle: {
    username: 'aristotle',
    email: 'aristotle@email.com',
    friends: ['socrates'],
  },
  plato: {
    username: 'plato',
    email: 'plato@email.com',
    friends: ['socrates'],
  },
};

// assign ids to each user
for (const username in userData) {
  userData[username]._id = Types.ObjectId();
}

// map friend usernames to friend ids
for (const username in userData) {
  const user = userData[username];
  user.friends = user.friends.map((friend) => userData[friend]._id);
}

async function seedUsers() {
  return User.insertMany(Object.values(userData));
}

module.exports = { seedUsers };
