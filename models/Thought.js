const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //include getter method to format the timestamp on query - should be below.
    },
    username: {
      type: String,
      required: true,
    },
    reactions: 
      [reactionSchema]

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;}
)

// Initialize thought model
const thought = model('thought', thoughtSchema);

module.exports = thought;
