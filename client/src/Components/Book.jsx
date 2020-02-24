import React from "react";
import {
  editBook,
  deleteBook,
  setEditBook
} from "./../Redux/Books/bookActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
function Book({ book, editBook, deleteBook, setEditBook }) {
  const handleEdit = () => {
    setEditBook(book);
  };
  return (
    <div className="Book">
      <div className="Book-cover">
        <img
          src={
            book.cover
              ? book.cover
              : `https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg`
          }
          alt="cover"
        />
      </div>
      <div className="Book-details">
        <p className="Book-name">{book.name}</p>
        <p className="Book-author">{book.author}</p>
        <p className="Book-rating">You rated it - {book.rating} / 10</p>
        {book.review && (
          <p className="Book-review">Your review - {book.review}</p>
        )}
      </div>
      <div className="Book-btn-div">
        <Link onClick={handleEdit} to={`/hobbies/books/${book._id}`}>
          {" "}
          <button className="btn">Edit</button>
        </Link>
        <button className="btn" onClick={() => deleteBook(book._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default connect(null, { editBook, deleteBook, setEditBook })(Book);
