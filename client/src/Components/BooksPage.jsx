import React from "react";
import { connect } from "react-redux";
import { getBooks } from "./../Redux/Books/bookActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BookForm from "./BookForm";
import Book from "./Book";
function BooksPage({ books, getBooks }) {
  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div className="BooksPage-container">
      <p className="utc"> Showing all your books!</p>
      <Link to="/hobbies/books/new">
        {" "}
        <button className="btn">Add a new book</button>
      </Link>
      <div className="Books-display-div">
        {books && books.map(b => <Book book={b} key={b._id} />)}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    books: state.books.books
  };
};
export default connect(mapStateToProps, { getBooks })(BooksPage);
