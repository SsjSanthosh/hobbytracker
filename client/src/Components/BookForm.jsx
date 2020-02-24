import React from "react";
import { useState } from "react";
import "./BooksPage.scss";
import { addBook } from "./../Redux/Books/bookActions";
import { connect } from "react-redux";
function BookForm({ addBook }) {
  const [book, setBook] = useState({
    name: "",
    author: "",
    rating: 0,
    review: "",
    status: "Finished",
    cover: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    addBook({ ...book });
  };

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  console.log(book);
  return (
    <div>
      <form className="Books-form" onSubmit={handleSubmit}>
        <div className="form-input-div">
          <label for="name">Book name</label>
          <input
            type="text"
            name="name"
            required
            value={book.name}
            placeholder="Enter the book's name"
            onChange={handleChange}
          />
        </div>

        <div className="form-input-div">
          <label for="author">Author's name</label>
          <input
            type="text"
            name="author"
            required
            value={book.author}
            placeholder="Enter the author's name"
            onChange={handleChange}
          />
        </div>
        <div className="form-input-div">
          <label for="rating">Your Score</label>
          <input
            type="number"
            name="rating"
            required
            value={book.rating}
            placeholder="Your rating for the book"
            onChange={handleChange}
          />
        </div>
        <div className="form-input-div">
          <label for="review">Book review</label>
          <input
            type="text"
            name="review"
            value={book.review}
            placeholder="Penny for your thoughts?"
            onChange={handleChange}
          />
        </div>
        <div className="form-input-div">
          <label for="cover">Book cover</label>
          <input
            type="text"
            name="cover"
            value={book.cover}
            placeholder="URL for the book cover"
            onChange={handleChange}
          />
        </div>
        <div className="form-input-div">
          <label for="name">Book name</label>
          <select name="status" onChange={handleChange}>
            <option value="finished" selected>
              Finished
            </option>
            <option value="ongoing">Ongoing</option>
            <option value="toberead">To be read</option>
          </select>
          <button className="btn">Add book</button>
        </div>
      </form>
    </div>
  );
}

export default connect(null, { addBook })(BookForm);
