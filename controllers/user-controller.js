const { User, Thought } = require('../models');

const userController = {

 
  getUsers(req, res) {
      User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
  },

  
  getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
          .select("-__v")
          .populate({
              path: 'Thought',
              strictPopulate: false
          })
          .populate({
              path: 'reactionSchema',
              strictPopulate: false
          })
          .then(async (user) =>
              !user
                  ? res.status(404).json({ message: "No using this id" })
                  : res.json(user)
          )
          .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
          });
  },

  // Create a new user
  createUser(req, res) {
      User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
  },

  // Update a user
  updateUser(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
      )
          .then((user) =>
              !user
                  ? res.status(404).json({ message: 'No user with this id' })
                  : res.json(user)
          )
          .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          });
  },

  deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
          .then(() => res.json({ message: 'User and user comments have been delete' }))
          .catch((err) => res.status(500).json(err));
  },

  
  addFriend(req, res) {
      console.log("You made a friend!");
      User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { friends: req.params.friendId } },
          { runValidators: true, new: true },
      )
          .then((user) =>
              !user
                  ? res.status(404).json({ message: "No user exist with that id :(" })
                  : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
  },
  
  removeFriend(req, res) {
      User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
      )
          .then((user) =>
              !user
                  ? res
                      .status(404)
                      .json({ message: "No friends exist with that id :(" })
                  : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
  },
};

 

module.exports = userController;
