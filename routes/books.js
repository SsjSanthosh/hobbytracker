const express = require("express");
const router = express.Router();
const auth = require("./../middlewares/auth");
const Book = require("./../models/Books");
const { check, validationResult } = require("express-validator");
router.get("/", auth, async (req, res) => {
  try {
    let books = await Book.find({ user: req.user.id });
    res.send(books);
  } catch {
    return res.send("Database error");
  }
});

// add new book
router.post(
  "/",

  [
    auth,
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("author", "Author is required")
      .not()
      .isEmpty(),
    check("rating", "Rating is required!")
      .not()
      .isEmpty()
      .isNumeric(),
    check("status", "Status is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, author, rating, status, review, cover } = req.body;

      let user = req.user.id;
      const book = new Book({ ...req.body, user });
      let exist = await Book.findOne({ name });
      if (exist) {
        return res.send("Book already exists");
      }
      book.save((err, book) => {
        if (err) {
          return res.send("Internal error").status(500);
        } else {
          res.send(book);
        }
      });
      console.log(name, author, rating, review);
    }
  }
);

// edit an existing book

router.put("/:id", auth, async (req, res) => {
  try {
    let newBook = await Book.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.send(newBook);
  } catch (err) {
    console.log("problem area");
  }
});

// delete an existing book
router.delete("/:id", auth, async (req, res) => {
  try {
    await Book.findByIdAndDelete({ _id: req.params.id });
    console.log("deleted");
    res.send("Book deleted");
  } catch {
    return res.send("Internal DB error");
  }
});
module.exports = router;
