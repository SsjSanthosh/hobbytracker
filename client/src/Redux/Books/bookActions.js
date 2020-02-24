import axios from "axios";
import { setAlert } from "./../Alert/alertActions";
export const getBooks = () => async dispatch => {
  try {
    const res = await axios.get("/hobbies/books");

    dispatch({ type: "BOOKS_LOADED", payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const addBook = book => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    book = JSON.stringify(book);
    const res = await axios.post("/hobbies/books", book, config);
    console.log(res);
    if (res.data === "Book already exists") {
      throw "Book exists, cannot add again";
    }
    dispatch({ type: "ADD_BOOK", payload: res.data });
    dispatch(setAlert("Added book successfully!", "success"));
  } catch (err) {
    console.log("going to catch");
    console.log(err);
    dispatch(setAlert(err, "success"));
  }
};

export const editBook = book => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put(`/hobbies/books/${book._id}`, book, config);
    console.log(res.data);
    dispatch(getBooks());
    dispatch(setAlert("Edited the book!", "success"));
  } catch (err) {
    return console.log("Internal server error");
  }
};

export const deleteBook = id => async dispatch => {
  try {
    const res = await axios.delete(`/hobbies/books/${id}`);
    dispatch(getBooks());
    dispatch(setAlert("Book deleted!", "success"));
  } catch (err) {
    return console.log("Could not delete book");
  }
};

export const setEditBook = book => dispatch => {
  dispatch({ type: "SET_EDIT_BOOK", payload: book });
};
