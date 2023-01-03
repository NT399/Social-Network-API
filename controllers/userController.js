const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((singleUser) =>
        !singleUser
          ? res.status(404).json({ message: 'User not found with that ID' })
          : res.json(singleUser)
      )
      .catch((err) => res.status(500).json(err));
  },

  // creating a new user
  createUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(500).json(err));
  },

  //update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    
    .then((newUser) =>
    !newUser
      ? res.status(404).json({ message: 'No User with this id!' })
      : res.json(newUser)
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  },


//add a friend
addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.body.friendId } },
    { runValidators: true, new: true }
  )
    .then((newUser) =>
      !newUser
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(newUser)
    )
    .catch((err) => res.status(500).json(err));
  },


//unfriend a friend
unFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((userId) =>
      !userId
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(userId)
    )
    .catch((err) => res.status(500).json(err));
},

//delete a friend
deleteUser(req, res) {
  User.findOneAndRemove({ _id: req.params.userId })
  .then((newUser) =>
  !newUser
    ? res.status(404).json({ message: 'No user with this id!' })
    : res.json(newUser)
)
.catch((err) => res.status(500).json(err));
},


};


