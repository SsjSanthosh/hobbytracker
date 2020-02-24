const initialState = {
  books: [],
  editing: {}
};

const bookReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "BOOKS_LOADED":
      return { ...state, books: payload };
    case "ADD_BOOK":
      return { ...state, books: [payload, ...state.books] };
    case "SET_EDIT_BOOK":
      return { ...state, editing: payload };
    default:
      return state;
  }
};

export default bookReducer;
