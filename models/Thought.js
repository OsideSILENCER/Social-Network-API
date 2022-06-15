const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Leave a thought',
      minlength: 1,
      maxlength: 200
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => moment(createdAt).format("MMM DD, YYYY")
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
