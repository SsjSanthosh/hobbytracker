import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import Landing from "./Components/Landing";
import "./Common.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BooksPage from "./Components/BooksPage";
import Login from "./Components/Login";
import Register from "./Components/Register";
import BookForm from "./Components/BookForm";
import { loadUser } from "./Redux/Auth/authActions";
import setAuthToken from "./Redux/setAuthToken";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import EditBook from "./Components/EditBook";
import Alert from "./Components/Alert";
if (localStorage.hobbytoken) {
  setAuthToken(localStorage.hobbytoken);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Alert />
          <Switch>
            <ProtectedRoute path="/hobbies/books" exact Component={BooksPage} />
            <ProtectedRoute
              path="/hobbies/books/new"
              exact
              Component={BookForm}
            />
            <ProtectedRoute
              path="/hobbies/books/:id"
              exact
              Component={EditBook}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/" exact component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
