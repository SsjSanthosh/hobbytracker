const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String
  },
  status: {
    type: String
  },
  cover: {
    type: String
  },
  published: {
    type: Date
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Book", bookSchema);
