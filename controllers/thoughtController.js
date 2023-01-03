const {Thought, User}  = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that Id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtId) => {
        return User.findOneAndUpdate(
          { _id: req.body.username },
          { $addToSet: { thought: thoughtId } },
          { new: true }
        );
      })
      .then((newUser) =>
        !newUser
          ? res.status(404).json({
              message: 'Thought created however there is no user for that ID',
            })
          : res.json('thought created')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

//update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

//delete thought
deleteThought(req, res) {
  Thought.findOneAndRemove({ _id: req.params.thoughtId })
  .then((thought) =>
  !thought
    ? res.status(404).json({ message: 'No thought with this id!' })
    : res.json(thought)
)
.catch((err) => res.status(500).json(err));
},
  
  // Add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body.reactionId } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
