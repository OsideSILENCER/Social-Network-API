const { Thought } = require('../models');

const minuteMs = 60000;
const hourMs = 60 * minuteMs;
const dayMs = 24 * hourMs;
const weekMs = dayMs * 7;

class DateGenerator {
  lastDate = null;

  // default stepMs is one day
  next(stepMs = 24 * 60 * 60 * 1000) {
    if (!this.lastDate) {
      // init lastDate to one week ago
      this.lastDate = Date.now() - weekMs;
    }
    this.lastDate += stepMs;
    if (this.lastDate > Date.now()) {
      throw new Error('Next date must not exceed the current time.');
    }
    return this.lastDate;
  }
}

const dateGen = new DateGenerator();

// All thoughts and reactions are quotes from goodreads.com. (https://www.goodreads.com/author/quotes/275648.Socrates, https://www.goodreads.com/author/quotes/2192.Aristotle, and https://www.goodreads.com/author/quotes/879.Plato)
const thoughtData = [
  {
    username: 'socrates',
    thoughtText: 'The only true wisdom is in knowing you know nothing.',
    createdAt: dateGen.next(0),
    reactions: [
      {
        username: 'plato',
        reactionBody:
          'I am the wisest man alive, for I know one thing, and that is that I know nothing.',
        createdAt: dateGen.next(30 * minuteMs),
      },
    ],
  },
  {
    username: 'socrates',
    thoughtText: 'The unexamined life is not worth living.',
    createdAt: dateGen.next(2 * hourMs),
    reactions: [],
  },
  {
    username: 'aristotle',
    thoughtText: 'Knowing yourself is the beginning of all wisdom.',
    createdAt: dateGen.next(2 * dayMs),
    reactions: [],
  },
  {
    username: 'aristotle',
    thoughtText:
      'Educating the mind without educating the heart is no education at all.',
    createdAt: dateGen.next(4 * hourMs),
    reactions: [
      {
        username: 'plato',
        reactionBody: 'Love is a serious mental disease.',
        createdAt: dateGen.next(minuteMs),
      },
    ],
  },
  {
    username: 'socrates',
    thoughtText: 'Be kind, for everyone you meet is fighting a hard battle.',
    createdAt: dateGen.next(2 * dayMs),
    reactions: [],
  },
  {
    username: 'aristotle',
    thoughtText:
      'It is the mark of an educated mind to be able to entertain a thought without accepting it.',
    createdAt: dateGen.next(1 * hourMs),
    reactions: [],
  },
  {
    username: 'socrates',
    thoughtText: 'I cannot teach anybody anything. I can only make them think',
    createdAt: dateGen.next(25 * minuteMs),
    reactions: [
      {
        username: 'aristotle',
        reactionBody: 'To perceive is to suffer.',
        createdAt: dateGen.next(30 * minuteMs),
      },
      {
        username: 'plato',
        reactionBody:
          'We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.',
        createdAt: dateGen.next(12 * minuteMs),
      },
      {
        username: 'plato',
        reactionBody:
          'Bodily exercise, when compulsory, does no harm to the body; but knowledge which is acquired under compulsion obtains no hold on the mind.”',
        createdAt: dateGen.next(53 * minuteMs),
      },
    ],
  },
];

function seedThoughts() {
  return Thought.insertMany(thoughtData);
}

module.exports = { seedThoughts };
