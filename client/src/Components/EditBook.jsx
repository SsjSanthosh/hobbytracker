import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { editBook } from "./../Redux/Books/bookActions";
function EditBook({ editBook, ebook }) {
  const [book, setBook] = useState({
    name: "",
    author: "",
    rating: 0,
    review: "",
    status: "",
    cover: "",
    _id: ""
  });

  useEffect(() => {
    setBook({
      name: ebook.name,
      author: ebook.author,
      rating: ebook.rating,
      review: ebook.review,
      cover: ebook.cover,
      status: ebook.status,
      _id: ebook._id
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    editBook(book);
  };

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form className="Books-form" onSubmit={handleSubmit}>
        <div className="form-input-div">
          <label for="name">Book name</label>
          <input
            type="text"
            name="name"
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
          <img src={book.cover} alt="cover" width="300" height="450" />
        </div>
        <div className="form-input-div">
          <label for="status">Book Status</label>
          <select name="status" onChange={handleChange}>
            <option value="finished">Finished</option>
            <option value="ongoing">Ongoing</option>
            <option value="toberead">To be read</option>
          </select>
          <button className="btn">Edit book</button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ebook: state.books.editing
  };
};
export default connect(mapStateToProps, { editBook })(EditBook);
